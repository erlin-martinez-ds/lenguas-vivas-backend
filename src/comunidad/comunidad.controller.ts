import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ComunidadService } from './comunidad.service';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('comunidad')
export class ComunidadController {
  constructor(private readonly comunidadService: ComunidadService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Post()
  crear(@Body() createComunidadDto: CreateComunidadDto) {
    return this.comunidadService.crear(createComunidadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  obtenerTodas() {
    return this.comunidadService.obtenerTodas();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  obtenerUna(@Param('id', ParseIntPipe) id: number) {
    return this.comunidadService.obtenerUna(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateComunidadDto: UpdateComunidadDto,
  ) {
    return this.comunidadService.actualizar(id, updateComunidadDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.comunidadService.eliminar(id);
  }
}
