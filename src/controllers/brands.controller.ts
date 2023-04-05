import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return {
      message: `brand con id ${id}`,
    };
  }

  @Get()
  getAll() {
    return {
      message: `todas las marcas`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: `esta acción crea una marca`,
      payload,
    };
  }
}
