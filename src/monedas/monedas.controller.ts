import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { MonedaService } from './monedas.service';
import { Moneda } from './moneda.entity';

@Controller('api/monedas')
export class MonedaController {
  constructor(private readonly monedaService: MonedaService) {}

  @Get()
  findAll(): Promise<Moneda[]> {
    return this.monedaService.findAll();
  }

  @Get(':codigo')
  findOne(@Param('codigo') codigo: string) {
    return this.monedaService.findOne(codigo);
  }

  @Post()
  create(@Body() data: Partial<Moneda>) {
    return this.monedaService.create(data);
  }

  @Put(':codigo')
  update(@Param('codigo') codigo: string, @Body() data: Partial<Moneda>) {
    return this.monedaService.update(codigo, data);
  }

  @Delete(':codigo')
  delete(@Param('codigo') codigo: string) {
    return this.monedaService.delete(codigo);
  }
}
