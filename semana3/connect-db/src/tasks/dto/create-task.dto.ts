import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({ 
        example: 'Finalizar proyecto NestJS', 
        description: 'El título de la tarea pendiente' 
    })
    titulo!: string;

    @ApiProperty({ 
        example: 1, 
        description: 'ID del usuario asignado a la tarea' 
    })
    userId!: number;

    @ApiProperty({ 
        example: 2, 
        description: 'ID de la categoría a la que pertenece la tarea' 
    })
    categoriaId!: number;

    @ApiProperty({
        example: 'Esta es una tarea de prueba',
        description: 'La descripción de la tarea',
        required: false
    })
    descripcion?: string;
}