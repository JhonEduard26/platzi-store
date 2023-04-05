import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      message: 'esta accion actualiza una marca',
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
