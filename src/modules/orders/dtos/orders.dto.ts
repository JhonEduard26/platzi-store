import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

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
