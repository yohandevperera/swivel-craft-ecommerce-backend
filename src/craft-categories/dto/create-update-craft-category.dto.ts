import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 *
 * The below class will be used to validate the craft category payload in create and update craft categories
 *
 */

export class CraftCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ type: String, description: 'name' })
  name: string;
}

/**
 *
 * The below class will be used to validate the craft category params
 *
 */

export class CraftCategoryParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
