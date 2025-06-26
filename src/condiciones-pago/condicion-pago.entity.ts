import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Empresa } from '../empresas/empresa.entity';

@Entity()
export class CondicionPago {
  @PrimaryGeneratedColumn() id: number;
  @Column() nombre: string;          // Contado, Crédito 30 d…
  @Column() dias: number;            // 0 = contado
  @ManyToOne(() => Empresa, { eager: true }) empresa: Empresa;
}