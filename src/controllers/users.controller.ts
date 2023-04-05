import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getHello(): string {
    return 'ruta: users.controller';
  }
}
