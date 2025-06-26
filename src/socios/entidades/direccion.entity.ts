import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SocioNegocio } from './socio-negocio.entity';
@Entity()
export class Direccion {
  @PrimaryGeneratedColumn() id: number;
  @Column() tipo: 'facturacion' | 'entrega' | 'sucursal';
  @Column() linea1: string;
  @Column({ nullable: true }) linea2: string;
  @Column() ciudad: string;
  @Column() departamento: string;
  @Column() pais: string;
  @ManyToOne(() => SocioNegocio, s => s.direcciones) socio: SocioNegocio;
}