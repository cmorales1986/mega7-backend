import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepo.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email }
      ]
    });

    if (existingUser) {
      throw new ConflictException('Usuario o email ya existe');
    }

    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ 
      where: { username },
      relations: ['empresa']
    });
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ 
      where: { email },
      relations: ['empresa']
    });
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ 
      where: { id },
      relations: ['empresa']
    });
    
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find({
      where: { isActive: true },
      relations: ['empresa']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    
    // Verificar conflictos de username/email si se están actualizando
    if (updateUserDto.username || updateUserDto.email) {
      const conflictUser = await this.userRepo.findOne({
        where: [
          { username: updateUserDto.username },
          { email: updateUserDto.email }
        ]
      });

      if (conflictUser && conflictUser.id !== id) {
        throw new ConflictException('Username o email ya está en uso');
      }
    }

    Object.assign(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.findById(id);
    
    const isCurrentPasswordValid = await user.validatePassword(changePasswordDto.currentPassword);
    if (!isCurrentPasswordValid) {
      throw new ConflictException('Contraseña actual incorrecta');
    }

    user.password = changePasswordDto.newPassword;
    await this.userRepo.save(user);
  }

  async deactivate(id: number): Promise<void> {
    const user = await this.findById(id);
    user.isActive = false;
    await this.userRepo.save(user);
  }
}