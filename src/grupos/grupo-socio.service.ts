import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GrupoSocio } from './grupo-socio.entity';

@Injectable()
export class GrupoSocioService {
  constructor(
    @InjectRepository(GrupoSocio)
    private readonly grupoSocioRepo: Repository<GrupoSocio>,
  ) {}

  findAll() {
    return this.grupoSocioRepo.find();
  }

  findOne(id: number) {
    return this.grupoSocioRepo.findOneBy({ id });
  }

  create(data: Partial<GrupoSocio>) {
    const nuevo = this.grupoSocioRepo.create(data);
    return this.grupoSocioRepo.save(nuevo);
  }

  async update(id: number, data: Partial<GrupoSocio>) {
    await this.grupoSocioRepo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
  const found = await this.findOne(id);
  if (!found) {
    throw new Error(`GrupoSocio con ID ${id} no encontrado.`);
  }
  return this.grupoSocioRepo.remove(found);
}

}
