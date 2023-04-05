import { Controller, Get } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getHello(): string {
    return 'Ruta: brands.controller';
  }
}
