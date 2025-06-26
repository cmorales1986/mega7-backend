import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SocioNegocio } from './entidades/socio-negocio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type TipoSN = 'cliente' | 'proveedor' | 'lead';

@Controller('api/socios')
export class SocioNegocioController {
  constructor(
    @InjectRepository(SocioNegocio)
    private readonly socioRepo: Repository<SocioNegocio>,
  ) {}

  @Get()
  async findAll(): Promise<SocioNegocio[]> {
    return this.socioRepo.find();
  }

  @Get(':tipo')
  async findByTipo(@Param('tipo') tipo: TipoSN): Promise<SocioNegocio[]> {
    return this.socioRepo.find({ where: { tipo } });
  }

  @Get('id/:id')
  async findById(@Param('id') id: number): Promise<SocioNegocio> {
    const socio = await this.socioRepo.findOne({ where: { id } });
    if (!socio) throw new NotFoundException('Socio no encontrado');
    return socio;
  }

  @Post()
  async create(@Body() socio: SocioNegocio): Promise<SocioNegocio> {
    return this.socioRepo.save(socio);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() socio: SocioNegocio,
  ): Promise<SocioNegocio> {
    await this.socioRepo.update(id, socio);
    return this.socioRepo.findOneByOrFail({ id });
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    const socio = await this.socioRepo.findOne({ where: { id } });
    if (!socio) throw new NotFoundException('Socio no encontrado');
    await this.socioRepo.remove(socio);
  }
}
