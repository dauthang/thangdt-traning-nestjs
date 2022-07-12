import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import EmailService from './email.service';
import { EmailConfirmationService } from './services/emailConfirmation.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [JwtModule, UserModule],
  providers: [EmailService, EmailConfirmationService],
  controllers: [EmailController],
  exports: [EmailConfirmationService, EmailService],
})
export class EmailModule {}
