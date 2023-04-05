import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('/:id/products/:productId')
  getCategory(@Param('id') id: string, @Param('productId') productId: string) {
    return `category ${id}, product ${productId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'esta acción crea una categoria',
      payload,
    };
  }
}
