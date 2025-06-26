import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CondicionPago } from './condicion-pago.entity';
import { CondicionPagoController } from './condicion-pago.controller';
import { CondicionPagoService } from './condicion-pago.service';

@Module({
  imports: [TypeOrmModule.forFeature([CondicionPago])],
  controllers: [CondicionPagoController],
  providers: [CondicionPagoService],
  exports: [CondicionPagoService],
})
export class CondicionPagoModule {}
