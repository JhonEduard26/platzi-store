import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getHello(): string {
    return 'ruta: orders.controller';
  }
}
