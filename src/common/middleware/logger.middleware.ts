import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin || 'origen desconocido';
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} desde ${origin}`);
    next();
  }
}
