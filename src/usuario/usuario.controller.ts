import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
  ) {}

  @Post()
  crear(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.crear(createUsuarioDto);
  }

  @Get()
  obtenerTodos() {
    return this.usuarioService.obtenerTodos();
  }

  @Get(':id')
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.obtenerUno(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.actualizar(
      id,
      updateUsuarioDto,
    );
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.eliminar(id);
  }
}