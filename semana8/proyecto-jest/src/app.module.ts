import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathService } from './math/math.service';
import { ProductsService } from './products/products.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MathService, ProductsService],
})
export class AppModule {}
