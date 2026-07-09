import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [CacheModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}