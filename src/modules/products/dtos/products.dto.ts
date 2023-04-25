import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  readonly brandId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly categoriesIds: number[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductsDTO {
  @ApiProperty()
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly limit: number;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  @IsInt()
  readonly offset: number;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly minPrice: number;

  @ApiProperty()
  @IsPositive()
  @ValidateIf((item) => item.minPrice)
  readonly maxPrice: number;
}
