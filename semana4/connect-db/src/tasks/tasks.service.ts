import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>,

        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async createTask(titulo: string, userId: number): Promise<Task> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
        }

        const nueva = this.tasksRepository.create({ titulo, user });
        return this.tasksRepository.save(nueva);
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find({ relations: ['user'] });
    }

    async findById(id: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
        if (!task) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }
        return task;
    }

    async updateTask(id: number, data: Partial<Task>): Promise<Task> {
        const task = await this.findById(id);
        Object.assign(task, data);
        return this.tasksRepository.save(task);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
        }
    }
}
