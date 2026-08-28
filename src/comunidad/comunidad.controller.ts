import { Controller, Get, Post, Body } from '@nestjs/common';
import { ComunidadService } from './comunidad.service';
import { CreateComunidadDto } from './dto/create-comunidad.dto';

@Controller('comunidad')
export class ComunidadController {
  constructor(private readonly comunidadService: ComunidadService) {}

  @Post()
  crear(@Body() createComunidadDto: CreateComunidadDto) {
    return this.comunidadService.crear(createComunidadDto);
  }

  @Get()
  obtenerTodas() {
    return this.comunidadService.obtenerTodas();
  }
}