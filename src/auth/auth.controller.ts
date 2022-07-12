import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import express, { Request, Response } from 'express';
import { UserDto } from '../user/dto/userDto.dto';
import { EmailConfirmationService } from '../email/services/emailConfirmation.service';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { GetUser } from '../components/decorators/get-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('auth-controller')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: UserDto) {
    const user = await this.authService.register(registrationData);
    await this.emailConfirmationService.sendVerificationLink(registrationData);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('/forgotPassword')
  async forgotPassword(
    @Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth()
  @Patch('/changePassword')
  async changePassword(
    @GetUser() user: RequestWithUser,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(user.user.id, changePasswordDto);
  }
}
