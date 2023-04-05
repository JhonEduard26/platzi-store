import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getAll() {
    return {
      message: 'esta acción retorna todos los clientes',
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'esta acción crea un cliente',
      payload,
    };
  }
}
