import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

interface CreateProductDto {
  name: string;
  price: number;
  category: number;
}

@Controller('products')
export class ProductsController {
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      ok: true,
      message: `limit: ${limit}, offset: ${offset}, brand: ${brand}`,
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return {
      ok: true,
      message: `product with id ${id}`,
    };
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return {
      ok: true,
      message: 'Esta acción crea un producto',
      createProductDto,
    };
  }
}
