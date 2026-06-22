import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { MachinesModule } from '../machines/machines.module';
import { PaymentsModule } from '../payments/payments.module';
import { RentalRequest } from './rental-request.entity';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RentalRequest]),
    AuthModule,
    MachinesModule,
    PaymentsModule,
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}
