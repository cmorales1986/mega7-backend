/* TipoCambio (histórico) --------------------------------------------------*/
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Moneda } from './moneda.entity';

@Entity()
export class TipoCambio {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => Moneda, m => m.tiposCambio, { eager: true })
  moneda: Moneda;
  @Column({ type: 'date' }) fecha: Date;
  @Column('decimal', { precision: 18, scale: 6 }) valor: number;
}