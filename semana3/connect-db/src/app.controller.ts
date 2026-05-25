import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('General') // Agrupa el endpoint de bienvenida
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Mensaje de bienvenida', 
    description: 'Endpoint de prueba para verificar que la API está funcionando correctamente.' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Retorna un saludo del servidor.' 
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
