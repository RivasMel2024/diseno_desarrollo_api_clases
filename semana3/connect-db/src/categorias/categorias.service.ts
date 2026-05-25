import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  create(nombre: string): Promise<Categoria> {
    const cat = this.categoriaRepository.create({ nombre });
    return this.categoriaRepository.save(cat);
  }

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {
    const cat = await this.categoriaRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException(`Categoria con ID ${id} no encontrada`);
    }
    return cat;
  }
}
