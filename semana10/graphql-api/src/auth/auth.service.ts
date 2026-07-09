import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from './dto/login.input';

const DEMO_USER = { username: 'admin', password: 'admin123' };

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(input: LoginInput): string {
    if (
      input.username !== DEMO_USER.username ||
      input.password !== DEMO_USER.password
    ) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.jwtService.sign({
      sub: DEMO_USER.username,
      username: DEMO_USER.username,
    });
  }
}
