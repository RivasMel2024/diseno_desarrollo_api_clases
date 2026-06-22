import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SeedBootstrap } from './seed.bootstrap';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [SeedService, SeedBootstrap],
  exports: [SeedService],
})
export class DatabaseModule {}
