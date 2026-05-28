import { Controller, Post, Get, Param, Body, Put, Delete, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(dto.nombre, dto.email);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(+id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    update(
        @Param('id') id: string,
        @Body() body: Partial<User>,
    ): Promise<User> {
        return this.usersService.updateUser(+id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario' })
    delete(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(+id);
    }
}
