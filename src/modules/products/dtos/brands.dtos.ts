import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateBrandDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
