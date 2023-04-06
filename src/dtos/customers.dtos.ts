import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateCustomerDTO {
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 15)
  readonly phone: string;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
