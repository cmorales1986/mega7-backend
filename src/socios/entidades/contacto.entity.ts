import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SocioNegocio } from './socio-negocio.entity'; // Importar la entidad SocioNegocio

@Entity()
export class Contacto {
  @PrimaryGeneratedColumn() id: number;
  @Column() nombre: string;
  @Column({ nullable: true }) cargo: string;
  @Column({ nullable: true }) email: string;
  @Column({ nullable: true }) telefono: string;
  @ManyToOne(() => SocioNegocio, s => s.contactos) socio: SocioNegocio;
}