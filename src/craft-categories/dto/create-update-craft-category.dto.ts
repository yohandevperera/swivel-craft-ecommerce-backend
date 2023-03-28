import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CraftCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ type: String, description: 'name' })
  name: string;
}

export class CraftCategoryParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
