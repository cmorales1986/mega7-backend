/* GrupoSocio -------------------------------------------------------------*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Empresa } from '../empresas/empresa.entity';
import { SocioNegocio } from '../socios/entidades/socio-negocio.entity';

@Entity()
export class GrupoSocio {
  @PrimaryGeneratedColumn() id: number;
  @Column() nombre: string;
  @Column({ default: 'cliente' }) tipo: 'cliente' | 'proveedor';
  @ManyToOne(() => Empresa, { eager: true }) empresa: Empresa;
  @OneToMany(() => SocioNegocio, s => s.grupo) socios: SocioNegocio[];
}