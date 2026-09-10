import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';

import { LenguaService } from './lengua.service';
import { CreateLenguaDto } from './dto/create-lengua.dto';
import { UpdateLenguaDto } from './dto/update-lengua.dto';

@Controller('lenguas')
export class LenguaController {
  constructor(private readonly lenguaService: LenguaService) {}

  @Post()
  crear(@Body() createLenguaDto: CreateLenguaDto) {
    return this.lenguaService.crear(createLenguaDto);
  }

  @Get()
  obtenerTodas() {
    return this.lenguaService.obtenerTodas();
  }

  @Get(':id')
  obtenerUna(@Param('id', ParseIntPipe) id: number) {
    return this.lenguaService.obtenerUna(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLenguaDto: UpdateLenguaDto,
  ) {
    return this.lenguaService.actualizar(id, updateLenguaDto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.lenguaService.eliminar(id);
  }
}