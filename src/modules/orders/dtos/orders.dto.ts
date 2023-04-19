import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  readonly total: number;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
