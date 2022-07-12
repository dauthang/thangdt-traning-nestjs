import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmailConfirmationService } from './services/emailConfirmation.service';
import RequestWithUser from '../auth/interfaces/requestWithUser.interface';
import JwtAuthenticationGuard from '../auth/guards/jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email-controller')
@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}
  @Get('confirm/:id')
  async confirm(@Param() params) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      params.id,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }

  @UseGuards(JwtAuthenticationGuard)
  async resendConfirmationLink(@Req() request: RequestWithUser) {
    await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }
}
