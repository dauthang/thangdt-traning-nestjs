import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import express, { Request, Response } from 'express';
import { UserDto } from '../user/dto/userDto.dto';
import { EmailConfirmationService } from '../email/services/emailConfirmation.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: UserDto) {
    const user = await this.authService.register(registrationData);
    await this.emailConfirmationService.sendVerificationLink(
      registrationData.email,
    );
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
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

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // todo
  }

  @Get('auth/gooogle/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
