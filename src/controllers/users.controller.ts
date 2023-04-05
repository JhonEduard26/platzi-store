import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAll() {
    return {
      message: 'esta acción retorna todos los usuarios',
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return {
      message: `usuario con id ${id}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'esta acción crea un usuario',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      message: 'esta accion actualiza un usuario',
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}
