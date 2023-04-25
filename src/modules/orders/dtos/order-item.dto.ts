import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsPositive()
  @IsInt()
  orderId: number;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
