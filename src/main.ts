import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

async function bootstrap() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  const app = await NestFactory.create(AppModule);

  // CORS más restrictivo para producción
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['http://localhost:3000', 'https://your-production-domain.com'] 
      : '*',
    credentials: true,
  });
  
  // Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.use(new LoggerMiddleware().use);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Aplicacion corriendo ${port}`);
}
bootstrap();