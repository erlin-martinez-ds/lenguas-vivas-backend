import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ComunidadService } from './comunidad.service';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';

@Controller('comunidad')
export class ComunidadController {
  constructor(
    private readonly comunidadService: ComunidadService,
  ) {}

  @Post()
  crear(@Body() createComunidadDto: CreateComunidadDto) {
    return this.comunidadService.crear(createComunidadDto);
  }

  @Get()
  obtenerTodas() {
    return this.comunidadService.obtenerTodas();
  }

  @Get(':id')
  obtenerUna(@Param('id', ParseIntPipe) id: number) {
    return this.comunidadService.obtenerUna(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComunidadDto: UpdateComunidadDto,
  ) {
    return this.comunidadService.actualizar(
      id,
      updateComunidadDto,
    );
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.comunidadService.eliminar(id);
  }
}