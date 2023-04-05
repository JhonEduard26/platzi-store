import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAll() {
    return {
      message: 'esta acción retorna todas las ventas',
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'esta acción crea una venta',
      payload,
    };
  }
}
