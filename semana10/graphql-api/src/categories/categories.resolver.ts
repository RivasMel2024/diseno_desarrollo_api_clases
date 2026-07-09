import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoriesService.create(input);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }
}
