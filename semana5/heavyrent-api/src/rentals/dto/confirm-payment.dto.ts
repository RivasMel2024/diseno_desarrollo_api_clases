import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPaymentDto {
  @ApiProperty({ example: 'pi_3xxxxxxxxxxxx' })
  @IsString()
  @IsNotEmpty()
  paymentIntentId: string;
}
