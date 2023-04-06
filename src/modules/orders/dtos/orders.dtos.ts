import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateOrderDTO {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly total: number;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
