import { Controller, Get } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  getHello(): string {
    return 'Ruta: customers.controller';
  }
}
