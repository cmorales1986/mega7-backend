import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByUsername(username);
      
      // Usar el método de la entidad para validar contraseña
      const isPasswordValid = await user.validatePassword(password);
      
      if (isPasswordValid && user.isActive) {
        const { password, ...result } = user;
        return result;
      }
      
      return null;
    } catch (error) {
      return null; // Usuario no encontrado
    }
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      empresaId: user.empresa?.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        empresa: user.empresa,
      },
      message: 'Login exitoso'
    };
  }
}