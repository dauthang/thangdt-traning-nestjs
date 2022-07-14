import {
  BadRequestException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ErrorCode, STATUS } from '../const/constants.const';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { UserDto } from '../user/dto/userDto.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import EmailService from '../email/email.service';
import VerificationTokenPayload from '../email/interfaces/verificationTokenPayload.interface';
import { ChangePasswordDto } from './dtos/change-password.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}
  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
    };
  }

  public async register(registrationData: UserDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.createUser({
        ...registrationData,
        password: hashedPassword,
        status: STATUS.CONFIRM,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email);
      await AuthService.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      if (STATUS.ACTIVE !== user.status) {
        throw new HttpException(
          'Please confirm your email address',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.getByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const payload: VerificationTokenPayload = {
      name: user?.name,
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    const forgotLink = `${this.configService.get(
      'CLIENT_APP_URL',
    )}/auth/forgotPassword?token=${token}`;
    return this.emailService.sendMail({
      from: `<${this.configService.get('MAIL_FROM')}>`,
      to: `${user?.name} <${user.email}>`,
      subject: 'Forgot Password',
      html: `
                <h3>Hello ${user.name}!</h3>
                <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
            `,
    });
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    const password = await bcrypt.hash(changePasswordDto.password, 10);
    await this.usersService.updateUser(userId, password);
    return true;
  }
}
