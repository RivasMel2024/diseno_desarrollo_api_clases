import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from './entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
