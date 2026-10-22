
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { GradoService } from './grado.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('grados')
@ApiTags('Grados')
@ApiBearerAuth()
export class GradoController {
  constructor(
    private readonly gradoService: GradoService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Post()
  crear(@Body() createGradoDto: CreateGradoDto) {
    return this.gradoService.crear(createGradoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  obtenerTodos() {
    return this.gradoService.obtenerTodos();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  obtenerUno(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.gradoService.obtenerUno(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGradoDto: UpdateGradoDto,
  ) {
    return this.gradoService.actualizar(
      id,
      updateGradoDto,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.gradoService.eliminar(id);
  }
}
