// src/email-alerts/mail.module.ts
import { Module } from '@nestjs/common';
import { MailAlertService } from './mail.service';

@Module({
  providers: [MailAlertService],
  exports: [MailAlertService], // <-- export so other modules can use it
})
export class MailAlertModule {}
