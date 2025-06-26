import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moneda } from './moneda.entity';

@Injectable()
export class MonedaService {
  constructor(
    @InjectRepository(Moneda)
    private readonly monedaRepo: Repository<Moneda>,
  ) {}

  findAll() {
    return this.monedaRepo.find();
  }

  findOne(codigo: string) {
    return this.monedaRepo.findOne({ where: { codigo } });
  }

  create(data: Partial<Moneda>) {
    return this.monedaRepo.save(data);
  }

  async update(codigo: string, data: Partial<Moneda>) {
    await this.monedaRepo.update(codigo, data);
    return this.findOne(codigo);
  }

  delete(codigo: string) {
    return this.monedaRepo.delete(codigo);
  }
}
