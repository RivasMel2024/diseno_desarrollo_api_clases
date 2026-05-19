import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TasksModule {}