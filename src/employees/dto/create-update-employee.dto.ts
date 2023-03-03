import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsDefined,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Gender {
  M,
  F,
}

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  @ApiProperty({ type: String, description: 'firstname' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  @ApiProperty({ type: String, description: 'lastname' })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;

  @IsDefined()
  @IsEnum(['M', 'F'])
  @ApiProperty({ enum: Gender, description: 'phone' })
  gender: 'M' | 'F';
}

export class EmployeeParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
