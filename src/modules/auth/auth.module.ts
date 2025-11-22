import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailAlertModule } from 'src/email-alerts/mail.module';
@Module({
  imports: [MailAlertModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
