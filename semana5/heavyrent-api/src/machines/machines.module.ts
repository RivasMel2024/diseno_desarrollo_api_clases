import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Machine } from './machine.entity';
import { RentalRequest } from '../rentals/rental-request.entity';
import { MachinesService } from './machines.service';
import { MachinesController } from './machines.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Machine, RentalRequest]),
    AuthModule,
  ],
  controllers: [MachinesController],
  providers: [MachinesService],
  exports: [MachinesService],
})
export class MachinesModule {}
