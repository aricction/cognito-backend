import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { MailAlertModule} from './email-alerts/mail.module';
import { OrderModule } from './modules/orders/order.module';

@Module({
  imports: [AuthModule, CommonModule, PrismaModule, ProductsModule , MailAlertModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

