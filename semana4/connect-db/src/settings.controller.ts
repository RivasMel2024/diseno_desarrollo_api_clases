import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

type AuthenticatedRequest = Request & {
  user: {
    userId: number;
    email: string;
  };
};

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener configuración privada' })
  @Get()
  getSettings(@Req() req: AuthenticatedRequest) {
    const { email } = req.user;

    return {
      mensaje: `Bienvenido a tu configuración, ${email}`,
      email,
    };
  }
}
