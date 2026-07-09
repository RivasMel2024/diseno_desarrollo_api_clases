import { Module } from '@nestjs/common';
import { CacheModule } from './cache/cache.module';
import { CoursesModule } from './courses/courses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CacheModule, CoursesModule, ProductsModule, DashboardModule],
})
export class AppModule {}