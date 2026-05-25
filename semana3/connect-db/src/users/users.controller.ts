import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario',
        description: 'Registra un nuevo usuario en la base de datos utilizando su nombre y email.'
    })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(dto.nombre, dto.email);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios',
        description: 'Retorna una lista de todos los usuarios registrados en la base de datos.'
    })
    @ApiResponse({ status: 200, description: 'Lista de usuarios' })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    update(@Param('id') id: string, @Body() body: Partial<User>): Promise<User> {
        return this.usersService.updateUser(+id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({ status: 204, description: 'Usuario eliminado correctamente' })
    delete(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(+id);
    }
}
