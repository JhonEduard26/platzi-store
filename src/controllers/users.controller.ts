import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
}
