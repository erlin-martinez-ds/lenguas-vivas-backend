import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsuarioInstitucionService } from './usuario-institucion.service';
import { CreateUsuarioInstitucionDto } from './dto/create-usuario-institucion.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('usuario-institucion')
@ApiTags('Usuarios e instituciones')
@ApiBearerAuth()
export class UsuarioInstitucionController {
  constructor(
    private readonly usuarioInstitucionService: UsuarioInstitucionService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR', 'RECTOR')
  @Post()
  crear(@Body() createDto: CreateUsuarioInstitucionDto) {
    return this.usuarioInstitucionService.crear(createDto);
  }
}
