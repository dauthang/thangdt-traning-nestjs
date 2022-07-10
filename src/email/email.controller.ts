import { Body, Controller, Post } from '@nestjs/common';
import ConfirmEmailDto from './dtos/confirmEmail.dto';
import { EmailConfirmationService } from './services/emailConfirmation.service';

@Controller('email-confirmation')
export class EmailController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}
  @Post('confirm')
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }
}
