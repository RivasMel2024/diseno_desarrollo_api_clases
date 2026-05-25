import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Categoria } from '../categorias/categoria.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Categoria)
        private readonly categoriaRepository: Repository<Categoria>,
    ) { }

    async createTask(titulo: string, descripcion: string, userId: number, categoriaId: number): Promise<Task> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(
                `Usuario con ID ${userId} no encontrado`,
            );
        }

        const categoria = await this.categoriaRepository.findOne({ where: { id: categoriaId } });
        if (!categoria) {
            throw new NotFoundException(`Categoria con ID ${categoriaId} no encontrada`);
        }

        const nueva = this.taskRepository.create({
            titulo,
            descripcion,
            user,
            categoria,
        });

        return this.taskRepository.save(nueva);
    }

    async findAll(): Promise<Task[]> {
        return this.taskRepository.find({
            relations: {
                user: true,
                categoria: true,
            },
        });
    }

    async findById(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: {
                user: true,
                categoria: true,
            },
        });

        if (!task) {
            throw new NotFoundException(
                `Tarea con ID ${id} no encontrada`,
            );
        }

        return task;
    }

    async updateTask(id: number, data: Partial<Task>): Promise<Task> {
        const task = await this.findById(id);

        Object.assign(task, data);

        return this.taskRepository.save(task);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(
                `Tarea con ID ${id} no encontrada`,
            );
        }
    }
}
