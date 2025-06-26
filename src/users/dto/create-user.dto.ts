// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional, IsEnum, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(['admin', 'empleado'])
  role?: 'admin' | 'empleado';

  @IsOptional()
  empresaId?: number;
}

