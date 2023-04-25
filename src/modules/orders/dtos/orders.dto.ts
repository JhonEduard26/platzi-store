import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty()
  @IsPositive()
  @IsInt()
  readonly customerId: number;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
