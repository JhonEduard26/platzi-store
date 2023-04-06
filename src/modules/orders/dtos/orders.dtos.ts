import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly total: number;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
