import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `limit: ${limit}, offset: ${offset}, brand: ${brand}`,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: `product with id ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Esta acción crea un producto',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      message: 'esta accion actualiza un producto',
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
