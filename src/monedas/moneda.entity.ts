/* Moneda -----------------------------------------------------------------*/
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { TipoCambio } from './tipo-cambio.entity'; // Importar la entidad TipoCambio
@Entity()
export class Moneda {
  @PrimaryColumn({ length: 3 }) codigo: string;   // GS, USD…
  @Column() descripcion: string;
  @OneToMany(() => TipoCambio, tc => tc.moneda) tiposCambio: TipoCambio[];
}