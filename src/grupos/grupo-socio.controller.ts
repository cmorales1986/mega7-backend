import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GrupoSocioService } from './grupo-socio.service';

@Controller('api/grupos-socio')
export class GrupoSocioController {
  constructor(private readonly service: GrupoSocioService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
