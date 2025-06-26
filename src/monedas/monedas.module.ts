import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneda } from './moneda.entity';
import { TipoCambio } from './tipo-cambio.entity';
import { MonedaService } from './monedas.service';
import { MonedaController } from './monedas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Moneda, TipoCambio])], // ← AÑADIDO TipoCambio
  controllers: [MonedaController],
  providers: [MonedaService],
  exports: [TypeOrmModule],
})
export class MonedaModule {}
