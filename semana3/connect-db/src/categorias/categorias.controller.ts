import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@ApiTags('Categorías') // Organiza los endpoints en la UI
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Crear una nueva categoría', 
    description: 'Permite registrar una categoría para agrupar diferentes tareas.' 
  })
  @ApiResponse({ status: 201, description: 'Categoría creada exitosamente.' })
  create(@Body() dto: CreateCategoriaDto) {
    return this.categoriasService.create(dto.nombre);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las categorías', 
    description: 'Retorna un listado de todas las categorías registradas.' 
  })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoría por ID' })
  @ApiParam({ name: 'id', description: 'Identificador único de la categoría' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada.' })
  @ApiResponse({ status: 404, description: 'No se encontró la categoría.' })
  findById(@Param('id') id: string) {
    return this.categoriasService.findById(+id);
  }
}
