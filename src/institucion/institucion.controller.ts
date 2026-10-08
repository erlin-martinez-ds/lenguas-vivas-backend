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

import { InstitucionService } from './institucion.service';

import { CreateInstitucionDto } from './dto/create-institucion.dto';

import { UpdateInstitucionDto } from './dto/update-institucion.dto';

import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('instituciones')
export class InstitucionController {
  constructor(private readonly institucionService: InstitucionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'RECTOR')
  @Post()
  crear(@Body() createDto: CreateInstitucionDto) {
    return this.institucionService.crear(createDto);
  }

  @Get()
  obtenerTodas() {
    return this.institucionService.obtenerTodas();
  }

  @Get(':id')
  obtenerUna(@Param('id', ParseIntPipe) id: number) {
    return this.institucionService.obtenerUna(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInstitucionDto: UpdateInstitucionDto,
  ) {
    return this.institucionService.actualizar(id, updateInstitucionDto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.institucionService.eliminar(id);
  }
}
