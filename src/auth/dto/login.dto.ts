import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
