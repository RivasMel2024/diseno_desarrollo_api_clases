import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private tasks = [{ id: 1, title: 'Estudiar NestJS' }];

  findAll() {
    return this.tasks;
  }

  create(title: string) {
    const newTask = { id: Date.now(), title };
    this.tasks.push(newTask);
    return newTask;
  }
}
