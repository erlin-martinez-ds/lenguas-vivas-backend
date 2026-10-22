import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { CambiarAprobacionDto } from './dto/cambiar-aprobacion.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Actividades')
@ApiBearerAuth()
@Controller('actividades')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  @Roles('DOCENTE', 'ADMINISTRADOR')
  @ApiOperation({ summary: 'Crear una actividad' })
  crear(@Body() dto: CreateActividadDto, @Req() req: { user: { id: number } }) {
    return this.actividadService.crear(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar actividades' })
  listar() {
    return this.actividadService.listar();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar una actividad por su ID' })
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.actividadService.obtenerPorId(id);
  }

  @Patch(':id')
  @Roles('DOCENTE', 'ADMINISTRADOR')
  @ApiOperation({ summary: 'Actualizar una actividad' })
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateActividadDto,
    @Req() req: { user: { id: number } },
  ) {
    return this.actividadService.actualizar(id, dto, req.user.id);
  }

  @Patch(':id/aprobacion')
  @Roles('ADMINISTRADOR', 'RECTOR')
  @ApiOperation({ summary: 'Aprobar o rechazar una actividad' })
  cambiarAprobacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarAprobacionDto,
    @Req() req: { user: { id: number } },
  ) {
    return this.actividadService.cambiarAprobacion(
      id,
      dto.estadoAprobacion,
      req.user.id,
    );
  }
}
