import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductConnection } from './entities/product-connection.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductFilterInput } from './dto/product-filter.input';
import { PaginationInput } from './dto/pagination.input';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @ResolveField(() => Category)
  category(@Parent() product: Product) {
    return this.categoriesService.findOne(product.categoryId);
  }

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productsService.create(input);
  }

  @Query(() => ProductConnection, { name: 'products' })
  findAll(
    @Args('filter', { nullable: true }) filter?: ProductFilterInput,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ) {
    return this.productsService.findAll(filter, pagination);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productsService.update(input.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
