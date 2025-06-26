import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CondicionPago } from './condicion-pago.entity';

@Injectable()
export class CondicionPagoService {
  constructor(
    @InjectRepository(CondicionPago)
    private readonly repo: Repository<CondicionPago>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: Partial<CondicionPago>) {
    const nueva = this.repo.create(data);
    return this.repo.save(nueva);
  }

  async update(id: number, data: Partial<CondicionPago>) {
    await this.repo.update(id, data);
    return this.repo.findOneBy({ id });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
