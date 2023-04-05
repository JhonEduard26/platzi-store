import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      message: 'esta accion actualiza un cliente',
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
