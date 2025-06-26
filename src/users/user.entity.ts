import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Empresa } from '../empresas/empresa.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ unique: true, length: 20, nullable: true })
  phone?: string;

  @Column()
  @Exclude() // Excluye la contraseña de las respuestas JSON
  password: string;

  @Column({ 
    type: 'varchar',
    length: 20,
    default: 'empleado' 
  })
  role: 'admin' | 'empleado';

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Empresa, { eager: true })
  empresa: Empresa;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Hash de contraseña antes de guardar
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // Método para validar contraseña
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}