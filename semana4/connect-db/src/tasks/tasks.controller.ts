import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Body() body: { titulo: string; userId: number }): Promise<Task> {
        return this.tasksService.createTask(body.titulo, body.userId);
    }

    @Get()
    findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findById(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Task>): Promise<Task> {
        return this.tasksService.updateTask(+id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(+id);
    }
}