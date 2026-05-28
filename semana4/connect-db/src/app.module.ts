import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { SettingsController } from './settings/settings.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // o tu usuario
      password: '1234',     // o tu contraseña
      database: 'apicurso',  // nombre de tu base de datos
      entities: [User, Task],
      synchronize: true, // crea tablas automáticamente
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  providers: [AuthService],
  controllers: [AuthController, SettingsController],
})
export class AppModule { }
