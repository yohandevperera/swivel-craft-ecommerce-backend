import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CraftDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'categoryId' })
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(300)
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsNumber()
  @IsString()
  @ApiProperty({ type: String, description: 'qty' })
  qty: number;

  @IsNumber()
  @IsString()
  @ApiProperty({ type: String, description: 'price' })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'categoryId' })
  photo: string;
}

export class CraftParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
