import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
export class CreateCustomerDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  readonly phone: string;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
