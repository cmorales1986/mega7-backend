// src/socios/socio-negocio.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocioNegocio } from './entidades/socio-negocio.entity';

@Injectable()
export class SocioNegocioService {
  constructor(
    @InjectRepository(SocioNegocio)
    private readonly repo: Repository<SocioNegocio>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<SocioNegocio>) {
    const socio = this.repo.create(data);
    return this.repo.save(socio);
  }

  async update(id: number, data: Partial<SocioNegocio>) {
    const socio = await this.repo.findOne({ where: { id } });
    if (!socio) throw new NotFoundException();
    Object.assign(socio, data);
    return this.repo.save(socio);
  }

  async remove(id: number) {
    const socio = await this.repo.findOne({ where: { id } });
    if (!socio) throw new NotFoundException();
    return this.repo.remove(socio);
  }
}