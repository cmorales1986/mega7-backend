import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Empresa } from '../../empresas/empresa.entity';
import { GrupoSocio } from '../../grupos/grupo-socio.entity';
import { Moneda } from '../../monedas/moneda.entity';
import { CondicionPago } from '../../condiciones-pago/condicion-pago.entity';
import { Contacto } from './contacto.entity';
import { Direccion } from './direccion.entity';

@Entity()
export class SocioNegocio {
  @PrimaryGeneratedColumn() id: number;
  @Column() codigo: string;
  @Column() nombre: string;
  @Column({ nullable: true }) nombreFantasia: string;
  @Column() tipo: 'cliente' | 'proveedor' | 'lead';
  @ManyToOne(() => GrupoSocio, { eager: true, nullable: true }) grupo: GrupoSocio;
  @ManyToOne(() => Moneda, { eager: true }) moneda: Moneda;
  @Column({ nullable: true }) ruc: string;
  @ManyToOne(() => Empresa, { eager: true }) empresa: Empresa;
  @OneToMany(() => Contacto, c => c.socio, { cascade: true }) contactos: Contacto[];
  @OneToMany(() => Direccion, d => d.socio, { cascade: true }) direcciones: Direccion[];
  @ManyToOne(() => CondicionPago, { eager: true, nullable: true })
  condicionPago: CondicionPago;
}