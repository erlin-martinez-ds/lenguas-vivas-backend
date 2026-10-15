import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { LenguaService } from './lengua.service';
import { CreateLenguaDto } from './dto/create-lengua.dto';
import { UpdateLenguaDto } from './dto/update-lengua.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('lenguas')
export class LenguaController {
  constructor(private readonly lenguaService: LenguaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Post()
  crear(@Body() createLenguaDto: CreateLenguaDto) {
    return this.lenguaService.crear(createLenguaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  obtenerTodas() {
    return this.lenguaService.obtenerTodas();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  obtenerUna(@Param('id', ParseIntPipe) id: number) {
    return this.lenguaService.obtenerUna(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLenguaDto: UpdateLenguaDto,
  ) {
    return this.lenguaService.actualizar(id, updateLenguaDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.lenguaService.eliminar(id);
  }
}
