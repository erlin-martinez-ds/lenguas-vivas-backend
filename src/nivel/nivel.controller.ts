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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { NivelService } from './nivel.service';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Niveles')
@ApiBearerAuth()
@Controller('niveles')
@UseGuards(JwtAuthGuard)
export class NivelController {
  constructor(private readonly nivelService: NivelService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRADOR')
  @ApiOperation({ summary: 'Crear un nivel de aprendizaje' })
  crear(@Body() dto: CreateNivelDto) {
    return this.nivelService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos los niveles' })
  obtenerTodos() {
    return this.nivelService.obtenerTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un nivel por su ID' })
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.nivelService.obtenerUno(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRADOR')
  @ApiOperation({ summary: 'Actualizar un nivel' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNivelDto,
  ) {
    return this.nivelService.actualizar(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRADOR')
  @ApiOperation({ summary: 'Eliminar un nivel' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.nivelService.eliminar(id);
  }
}