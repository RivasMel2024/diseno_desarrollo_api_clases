import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() body: { nombre: string; email: string }): Promise<User> {
        return this.usersService.createUser(body.nombre, body.email);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<User> {
        return this.usersService.findById(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<User>): Promise<User> {
        return this.usersService.updateUser(+id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.usersService.deleteUser(+id);
    }
}
