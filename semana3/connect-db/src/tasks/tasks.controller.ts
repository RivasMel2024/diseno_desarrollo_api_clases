import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Tasks') // Tag solicitado para organizar la UI
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    @ApiOperation({ 
        summary: 'Crear una nueva tarea', 
        description: 'Crea una tarea vinculada a un usuario y una categoría existentes.' 
    })
    @ApiResponse({ status: 201, description: 'Tarea creada con éxito.' })
    create(@Body() dto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(dto.titulo, dto.descripcion ?? '', dto.userId, dto.categoriaId);
    }

    @Get()
    @ApiOperation({ 
        summary: 'Listar todas las tareas', 
        description: 'Retorna una lista de tareas incluyendo la información del usuario y categoría.' 
    })
    findAll(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una tarea por ID' })
    @ApiParam({ name: 'id', description: 'ID de la tarea a buscar' })
    findById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.findById(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una tarea' })
    @ApiParam({ name: 'id', description: 'ID de la tarea a modificar' })
    update(@Param('id') id: string, @Body() body: Partial<Task>): Promise<Task> {
        return this.tasksService.updateTask(+id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una tarea' })
    @ApiParam({ name: 'id', description: 'ID de la tarea a borrar' })
    @ApiResponse({ status: 204, description: 'Tarea eliminada satisfactoriamente.' })
    delete(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(+id);
    }
}