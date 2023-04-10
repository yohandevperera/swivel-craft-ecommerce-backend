import { IsString, IsNotEmpty, IsDefined, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userRoleEnum } from 'src/auth/roles';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'firstname' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsDefined()
  @IsEnum([userRoleEnum.ADMIN, userRoleEnum.USER])
  userRole: userRoleEnum | string;
}

export class UserParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
