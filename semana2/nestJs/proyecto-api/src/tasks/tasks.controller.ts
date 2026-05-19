import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './tasks.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    getAllTasks() {
        return this.taskService.findAll();
    }

    @Post()
    createTask(@Body() body: { title: string }) {
        return this.taskService.create(body.title);
    }
}