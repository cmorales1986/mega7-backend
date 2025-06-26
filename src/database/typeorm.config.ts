import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // lee el .env

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '1433', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production', // ✅ Mejor práctica
  logging: process.env.NODE_ENV === 'development',
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  options: {
    encrypt: process.env.NODE_ENV === 'production',
    enableArithAbort: true,
  },
};