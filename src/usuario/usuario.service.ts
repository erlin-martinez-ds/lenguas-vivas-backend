import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Rol } from '../roles/entities/rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async crear(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const rol = await this.rolRepository.findOneBy({
      id: createUsuarioDto.rolId,
    });

    if (!rol) {
      throw new NotFoundException(
        `El rol con ID ${createUsuarioDto.rolId} no existe`,
      );
    }

    const nuevoUsuario = this.usuarioRepository.create({
      nombre: createUsuarioDto.nombre,
      correo: createUsuarioDto.correo,
      rol,
    });

    return this.usuarioRepository.save(nuevoUsuario);
  }

  obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: { rol: true },
    });
  }

  async obtenerUno(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: { rol: true },
    });

    if (!usuario) {
      throw new NotFoundException(
        `El usuario con ID ${id} no existe`,
      );
    }

    return usuario;
  }

  async actualizar(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.obtenerUno(id);

    if (updateUsuarioDto.nombre !== undefined) {
      usuario.nombre = updateUsuarioDto.nombre;
    }

    if (updateUsuarioDto.correo !== undefined) {
      usuario.correo = updateUsuarioDto.correo;
    }

    if (updateUsuarioDto.rolId !== undefined) {
      const rol = await this.rolRepository.findOneBy({
        id: updateUsuarioDto.rolId,
      });

      if (!rol) {
        throw new NotFoundException(
          `El rol con ID ${updateUsuarioDto.rolId} no existe`,
        );
      }

      usuario.rol = rol;
    }

    return this.usuarioRepository.save(usuario);
  }

  async eliminar(id: number): Promise<void> {
    const usuario = await this.obtenerUno(id);

    await this.usuarioRepository.remove(usuario);
  }
}