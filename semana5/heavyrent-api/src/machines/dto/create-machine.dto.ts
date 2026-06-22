import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { MachineStatus } from '../machine.entity';

export class CreateMachineDto {
  @ApiProperty({ example: 'Excavadora CAT 320' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Excavadora' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiPropertyOptional({ enum: MachineStatus, default: MachineStatus.DISPONIBLE })
  @IsOptional()
  @IsEnum(MachineStatus)
  status?: MachineStatus;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @IsPositive()
  @Min(1)
  dailyRate: number;
}
