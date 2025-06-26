import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor 
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor) // Excluye campos marcados con @Exclude
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getProfile(@User() user: any) {
    return {
      message: 'Usuario autenticado',
      user
    };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      message: 'Usuarios obtenidos exitosamente',
      data: users
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(+id);
    return {
      message: 'Usuario encontrado',
      data: user
    };
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      message: 'Usuario creado exitosamente',
      data: user
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    return {
      message: 'Usuario actualizado exitosamente',
      data: user
    };
  }

  @Put(':id/change-password')
  async changePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
    await this.usersService.changePassword(+id, changePasswordDto);
    return {
      message: 'Contraseña cambiada exitosamente'
    };
  }

  @Delete(':id')
  async deactivate(@Param('id') id: string) {
    await this.usersService.deactivate(+id);
    return {
      message: 'Usuario desactivado exitosamente'
    };
  }
}