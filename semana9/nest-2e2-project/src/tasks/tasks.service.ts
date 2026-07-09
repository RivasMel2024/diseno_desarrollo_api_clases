import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly repo: Repository<Task>,
	) {}

	findAll() {
		return this.repo.find();
	}

	create(data: CreateTaskDto) {
		const task = this.repo.create(data);
		return this.repo.save(task);
	}
}
