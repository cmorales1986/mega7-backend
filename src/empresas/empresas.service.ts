import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepo: Repository<Empresa>,
  ) {}

  async findById(id: number) {
    return this.empresaRepo.findOne({ where: { id } });
  }

  // Podés agregar más funciones como create, findAll, etc.
}
