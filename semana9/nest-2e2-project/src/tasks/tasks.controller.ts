import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
	constructor(private readonly service: TasksService) {}

	@Get()
	findAll() {
		return this.service.findAll();
	}

	@Post()
	create(@Body() dto: CreateTaskDto) {
		return this.service.create(dto);
	}
}
