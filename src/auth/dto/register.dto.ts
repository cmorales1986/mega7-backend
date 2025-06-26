import { IsEmail, IsString, MinLength, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(['admin', 'empleado'])
  role?: 'admin' | 'empleado';

  @IsNumber()
  empresaId: number;
}