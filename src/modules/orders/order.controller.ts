import { OrderService } from "./orders.service";
import { CreateOrderRequest } from "../auth/data-transfer-objects/create-order.dto";
import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';


@Controller('order')
export class OrderController {
    constructor( private orderService: OrderService) {}
    
    @Post('place')
    async placeOrder(@Body() dto: CreateOrderRequest) {
        try {
            return await this.orderService.createOrder(dto);
        } catch (error) {
            console.error('Order placement error:', error);
            throw new HttpException(
                error.message || 'Failed to place order',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}