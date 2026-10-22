
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

import { TemaService } from './tema.service';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Temas')
@ApiBearerAuth()
@Controller('temas')
@UseGuards(JwtAuthGuard)
export class TemaController {
  constructor(private readonly temaService: TemaService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRADOR')
  @ApiOperation({ summary: 'Crear un tema' })
  crear(@Body() dto: CreateTemaDto) {
    return this.temaService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos los temas' })
  obtenerTodos() {
    return this.temaService.obtenerTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un tema por ID' })
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.temaService.obtenerUno(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRADOR')
  @ApiOperation({ summary: 'Actualizar un tema' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTemaDto,
  ) {
    return this.temaService.actualizar(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRADOR')
  @ApiOperation({ summary: 'Eliminar un tema' })
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.temaService.eliminar(id);
  }
}
