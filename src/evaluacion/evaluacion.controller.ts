
import {
  Body,
  Controller,
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
import { AuthGuard } from '@nestjs/passport';

import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Evaluaciones')
@ApiBearerAuth()
@Controller('evaluaciones')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class EvaluacionController {
  constructor(
    private readonly evaluacionService: EvaluacionService,
  ) {}

  @Post()
  @Roles('ADMINISTRADOR', 'DOCENTE')
  @ApiOperation({ summary: 'Crear una evaluación' })
  crear(@Body() dto: CreateEvaluacionDto) {
    return this.evaluacionService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar evaluaciones' })
  listar() {
    return this.evaluacionService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar una evaluación por ID' })
  obtenerPorId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.evaluacionService.obtenerPorId(id);
  }

  @Patch(':id')
  @Roles('ADMINISTRADOR', 'DOCENTE')
  @ApiOperation({ summary: 'Actualizar una evaluación' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEvaluacionDto,
  ) {
    return this.evaluacionService.actualizar(id, dto);
  }
}
