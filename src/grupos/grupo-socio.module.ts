import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoSocio } from './grupo-socio.entity';
import { GrupoSocioService } from './grupo-socio.service';
import { GrupoSocioController } from './grupo-socio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoSocio])],
  providers: [GrupoSocioService],
  controllers: [GrupoSocioController],
  exports: [GrupoSocioService],
})
export class GrupoSocioModule {}
