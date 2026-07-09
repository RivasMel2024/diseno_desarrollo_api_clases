import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  create(input: CreateCategoryInput): Promise<Category> {
    const newCategory = this.categoryRepo.create(input);
    return this.categoryRepo.save(newCategory);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find({ relations: { products: true } });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: { products: true },
    });
    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return category;
  }
}
