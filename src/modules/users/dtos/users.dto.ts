import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @ApiProperty()
  @IsPositive()
  @IsOptional()
  readonly customerId: number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
