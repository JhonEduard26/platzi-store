import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cats')
  findAll(): string {
    return 'This action returning all cats';
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    return `product with id ${id}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `category ${id}, product ${productId}`;
  }
}
