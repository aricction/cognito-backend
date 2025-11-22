import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailAlertModule } from '@/email-alerts/mail.module';
import { PrismaModule } from '@/prisma/prisma.module';
@Module({
  imports: [PrismaModule, MailAlertModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
