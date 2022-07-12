import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import EmailService from '../email.service';
import VerificationTokenPayload from '../interfaces/verificationTokenPayload.interface';
import { UserService } from '../../user/user.service';
import { STATUS } from '../../const/constants.const';
import { UserDto } from '../../user/dto/userDto.dto';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UserService,
  ) {}
  public async confirmEmail(email: string) {
    const user = await this.usersService.getByEmail(email);
    if (STATUS.CONFIRM !== user.status) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.usersService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === '') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
  public sendVerificationLink(user: UserDto) {
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

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}/${token}`;

    const text = `Welcome to the application. To confirm the email, click here: ${url}`;

    return this.emailService.sendMail({
      from: '<thangdt@vmodev.com>',
      to: `${user?.name} <${user.email}>`,
      subject: 'Email confirmation',
      text,
    });
  }

  public async resendConfirmationLink(userId: number) {
    const user = await this.usersService.getById(userId);
    if (STATUS.ACTIVE === user.status) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.sendVerificationLink(user);
  }
}
