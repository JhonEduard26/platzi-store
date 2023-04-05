import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `limit: ${limit}, offset: ${offset}, brand: ${brand}`;
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return `product with id ${id}`;
  }
}
