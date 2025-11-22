import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './order.controller';
import { MailAlertModule } from '@/email-alerts/mail.module';
@Module({
    imports: [MailAlertModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
