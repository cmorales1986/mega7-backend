import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { EmpresasService } from '../empresas/empresas.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private empresasService: EmpresasService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      // Verificar si el usuario ya existe (el UsersService ya maneja esto)
      const existingByUsername = await this.usersService.findByUsername(registerDto.username).catch(() => null);
      if (existingByUsername) {
        throw new BadRequestException('Username ya existe');
      }

      // Verificar si la empresa existe
      const empresa = await this.empresasService.findById(registerDto.empresaId);
      if (!empresa) {
        throw new BadRequestException('Empresa no válida');
      }

      // Crear usuario (la entidad se encarga del hash de la contraseña)
      const user = await this.usersService.create({
        username: registerDto.username,
        email: registerDto.email,
        phone: registerDto.phone,
        password: registerDto.password, // Sin hash manual
        role: registerDto.role || 'empleado',
        empresaId: registerDto.empresaId, // Usar empresaId, no empresa
      });

      return { 
        message: 'Usuario registrado exitosamente', 
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
          empresa: user.empresa,
        }
      };

    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al registrar usuario');
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(loginDto.username, loginDto.password);
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      
      return this.authService.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Error en el proceso de login');
    }
  }
}