import { IsString, IsNotEmpty, IsDefined, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum UserRole {
  'ADMIN',
  'USER',
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'firstname' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'phone' })
  phone: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsDefined()
  @IsEnum(['USER', 'ADMIN'])
  @ApiProperty({ enum: UserRole, description: 'userRole' })
  userRole: UserRole.ADMIN | UserRole.USER;
}

export class UserParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class UserLoginParamsDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
