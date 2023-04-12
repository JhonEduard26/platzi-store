import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly total: number;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
