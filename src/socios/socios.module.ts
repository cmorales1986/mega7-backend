// src/socios/socio-negocio.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocioNegocio } from './entidades/socio-negocio.entity';
import { SocioNegocioService } from './socios.service';
import { SocioNegocioController } from './socios.controller';
import { Contacto } from './entidades/contacto.entity';
import { Direccion } from './entidades/direccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocioNegocio, Contacto, Direccion])],
  providers: [SocioNegocioService],
  controllers: [SocioNegocioController],
  exports: [SocioNegocioService],
})
export class SocioNegocioModule {}