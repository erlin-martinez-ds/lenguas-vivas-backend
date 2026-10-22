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

import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

type UsuarioPublico = Omit<Usuario, 'password_hash' | 'pin_hash'>;

function ocultarCredenciales(usuario: Usuario): UsuarioPublico {
  const usuarioPublico = { ...usuario };
  Reflect.deleteProperty(usuarioPublico, 'password_hash');
  Reflect.deleteProperty(usuarioPublico, 'pin_hash');
  return usuarioPublico;
}

@Controller('usuarios')
@ApiTags('Usuarios')
@ApiBearerAuth()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Post()
  async crear(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<UsuarioPublico> {
    const usuario = await this.usuarioService.crear(createUsuarioDto);

    return ocultarCredenciales(usuario);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Get()
  async obtenerTodos(): Promise<UsuarioPublico[]> {
    const usuarios = await this.usuarioService.obtenerTodos();
    return usuarios.map(ocultarCredenciales);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Get(':id')
  async obtenerUno(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UsuarioPublico> {
    const usuario = await this.usuarioService.obtenerUno(id);
    return ocultarCredenciales(usuario);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Patch(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<UsuarioPublico> {
    const usuario = await this.usuarioService.actualizar(id, updateUsuarioDto);

    return ocultarCredenciales(usuario);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.eliminar(id);
  }
}
