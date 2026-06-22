import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty({ example: 'uuid-de-la-maquina' })
  @IsUUID()
  @IsNotEmpty()
  machineId: string;

  @ApiProperty({ example: '2026-06-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-06-20' })
  @IsDateString()
  endDate: string;
}
