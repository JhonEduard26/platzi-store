import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
export class CreateBrandDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
