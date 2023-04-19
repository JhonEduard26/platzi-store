import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
