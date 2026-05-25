import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task.entity';
import { CategoriasModule } from '../categorias/categorias.module';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), UsersModule, CategoriasModule],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
