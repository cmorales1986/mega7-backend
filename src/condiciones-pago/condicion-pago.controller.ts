import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CondicionPagoService } from './condicion-pago.service';
import { CondicionPago } from './condicion-pago.entity';

@Controller('condiciones-pago')
export class CondicionPagoController {
  constructor(private readonly service: CondicionPagoService) {}

  @Get()
  findAll(): Promise<CondicionPago[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<CondicionPago>) {
    return this.service.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<CondicionPago>) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
