import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { UsuarioInstitucionService } from './usuario-institucion.service';
import { CreateUsuarioInstitucionDto } from './dto/create-usuario-institucion.dto';

@Controller('usuario-institucion')
export class UsuarioInstitucionController {
  constructor(
    private readonly usuarioInstitucionService: UsuarioInstitucionService,
  ) {}

  @Post()
  crear(@Body() createDto: CreateUsuarioInstitucionDto) {
    return this.usuarioInstitucionService.crear(createDto);
  }
}