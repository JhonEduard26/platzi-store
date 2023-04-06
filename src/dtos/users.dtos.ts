import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
