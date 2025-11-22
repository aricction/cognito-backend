import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateOrderRequest } from '../auth/data-transfer-objects/create-order.dto';
import { MailAlertService } from '@/email-alerts/mail.service';
@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailAlertService,
  ) {}

  async createOrder(dto: CreateOrderRequest) {
    try {
      //save to db
      const order = await this.prismaService.order.create({ 
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          address: dto.address,
          city: dto.city,
          postCode: dto.postCode,
          country: dto.country,
          regionState: dto.regionState,
          cartItems: dto.cartItems as any,
          totalAmount: dto.totalAmount,
          deliveryMethod: dto.deliveryMethod,
          paymentMethod: dto.paymentMethod,
        }
      });

      // Send email (non-blocking - don't fail order if email fails)
      try {
        const cartHtml = dto.cartItems
          .map(
            (items) =>
              `<li>${items.name} - $${items.price} x ${items.quantity}</li>`,
          )
          .join('');

        const emailHTML = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #F53E32;">Order Confirmation</h2>
            <p>Hi ${dto.firstName},</p>
            <p>Thank you for your order! Here are your order details:</p>
            <h3>Order Items:</h3>
            <ul>${cartHtml}</ul>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <p><strong>Total Amount:</strong> $${dto.totalAmount}</p>
              <p><strong>Delivery Method:</strong> ${dto.deliveryMethod}</p>
              <p><strong>Payment Method:</strong> ${dto.paymentMethod}</p>
            </div>
            <p style="margin-top: 20px;">We'll send you another email once your order ships.</p>
            <p>Thank you for shopping with us!</p>
          </div>
        `;

        await this.mailService.sendEmail(
          dto.email,
          'Order Confirmation',
          emailHTML
        );
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError);
        // Don't throw - order was created successfully
      }

      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
}
