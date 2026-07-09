import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, LessThanOrEqual, Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductFilterInput } from './dto/product-filter.input';
import { PaginationInput } from './dto/pagination.input';
import { Product } from './entities/product.entity';
import { ProductConnection } from './entities/product-connection.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    await this.categoriesService.findOne(input.categoryId);
    const newProduct = this.productRepo.create(input);
    return this.productRepo.save(newProduct);
  }

  async findAll(
    filter: ProductFilterInput = {},
    pagination: PaginationInput = {},
  ): Promise<ProductConnection> {
    const { categoryId, priceMin, priceMax } = filter;
    const { skip = 0, take = 10 } = pagination;

    const where: Record<string, unknown> = {};
    if (categoryId !== undefined) {
      where.categoryId = categoryId;
    }
    if (priceMin !== undefined && priceMax !== undefined) {
      where.price = Between(priceMin, priceMax);
    } else if (priceMin !== undefined) {
      where.price = MoreThanOrEqual(priceMin);
    } else if (priceMax !== undefined) {
      where.price = LessThanOrEqual(priceMax);
    }

    const [items, total] = await this.productRepo.findAndCount({
      where,
      skip,
      take,
    });

    return { items, total };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: number, input: UpdateProductInput): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, input);
    return this.productRepo.save(product);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return true;
  }
}
