import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para el login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }

  // Endpoint para registrar un nuevo usuario
  @Post('register')
  async register(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      role: 'ADMIN' | 'CLIENT';
    },
  ) {
    return this.authService.register(body);
  }

  // Ruta protegida que solo usuarios autenticados pueden acceder
  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProfile(@Request() req) {
    return req.user;
  }
}
