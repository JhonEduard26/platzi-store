import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
