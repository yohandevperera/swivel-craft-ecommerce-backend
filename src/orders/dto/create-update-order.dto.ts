import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({ type: String, description: 'orderId' })
  orderId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(300)
  @ApiProperty({ type: String, description: 'carftId' })
  craftId: string;

  @IsNumber()
  @ApiProperty({ type: String, description: 'totalPrice' })
  totalPrice: number;

  @IsNumber()
  @ApiProperty({ type: String, description: 'qtyBought' })
  qtyBought: number;
}

export class OrderParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
