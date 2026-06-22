import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Diseno de logo profesional' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @ApiProperty({ example: 'Diseno' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  category: string;

  @ApiProperty({ example: 'Incluye tres propuestas y dos rondas de ajustes.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({ example: 120 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;
}
