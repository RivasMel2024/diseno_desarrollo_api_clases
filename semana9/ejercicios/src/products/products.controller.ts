import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { CreateProductInput } from './products.service';

@Controller('products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateProductInput) {
    return this.productsService.create(body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productsService.remove(id);
  }
}
