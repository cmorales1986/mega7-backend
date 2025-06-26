import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmpresasModule } from './empresas/empresas.module';
import { SocioNegocioModule } from './socios/socios.module';
import { MonedaModule } from './monedas/monedas.module';
import { GrupoSocioModule } from './grupos/grupo-socio.module';
import { CondicionPagoModule } from './condiciones-pago/condicion-pago.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    EmpresasModule,
    SocioNegocioModule,
    MonedaModule,
    GrupoSocioModule,
    CondicionPagoModule,
  ],
})
export class AppModule {}
