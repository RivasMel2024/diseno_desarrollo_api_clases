import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Agrupa los endpints para swagger
@ApiTags('settings')

// Define el controlador para la ruta
@Controller('settings')
export class SettingsController {

	// Exige el token para acceder al endpoint
	@UseGuards(JwtAuthGuard)

	// Indica a swagger que este endpoint requiere autenticación
	@ApiBearerAuth()
	
	@Get()
	getSettings(@Req() req: Request) {
		const user = req.user as { email?: string } | undefined;

		return {
			mensaje: `Bienvenido a tu configuracion, ${user?.email ?? 'usuario'}`,
			email: user?.email ?? null,
		};
	}
}

