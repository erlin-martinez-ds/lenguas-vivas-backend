import { Controller, Get, Post, Body } from '@nestjs/common';
import { LenguaService } from './lengua.service';
import { CreateLenguaDto } from './dto/create-lengua.dto';

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
}