import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
