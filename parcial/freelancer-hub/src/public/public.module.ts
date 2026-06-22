import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { PublicController } from './public.controller';

@Module({
  imports: [ServicesModule],
  controllers: [PublicController],
})
export class PublicModule {}
