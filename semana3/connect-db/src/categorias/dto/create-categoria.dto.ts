import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ 
    example: 'Trabajo', 
    description: 'El nombre de la categoría para clasificar tareas' 
  })
  nombre!: string;
}