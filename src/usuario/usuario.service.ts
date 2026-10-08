import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Usuario } from './entities/usuario.entity';

import { CreateUsuarioDto } from './dto/create-usuario.dto';

import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import { Rol } from '../roles/entities/rol.entity';

import { Grado } from '../grado/entities/grado.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
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
    let grado: Grado | null = null;

    if (createUsuarioDto.id_grado !== undefined) {
      grado = await this.gradoRepository.findOneBy({
        id: createUsuarioDto.id_grado,
      });

      if (!grado) {
        throw new NotFoundException(
          `El grado con ID ${createUsuarioDto.id_grado} no existe`,
        );
      }
    }

    const nuevoUsuario = this.usuarioRepository.create({
      nombre: createUsuarioDto.nombre,
      apellido: createUsuarioDto.apellido,
      correo: createUsuarioDto.correo ?? null,
      password_hash:
        createUsuarioDto.password !== undefined
          ? await bcrypt.hash(createUsuarioDto.password, 10)
          : null,
      codigo_estudiante: createUsuarioDto.codigo_estudiante ?? null,
      pin_hash: createUsuarioDto.pin_hash ?? null,
      id_comunidad: createUsuarioDto.id_comunidad ?? null,
      id_grado: grado?.id ?? null,
      grado: grado,
      estado: createUsuarioDto.estado ?? 'ACTIVO',
      rol_id: rol.id,
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: {
        comunidad: true,
        rol: true,
        grado: true,
        instituciones: {
          institucion: true,
        },
      },
    });
  }

  async obtenerUno(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: {
        comunidad: true,
        rol: true,
        grado: true,
        instituciones: {
          institucion: true,
        },
      },
    });

    if (!usuario) {
      throw new NotFoundException(`El usuario con ID ${id} no existe`);
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

    if (updateUsuarioDto.apellido !== undefined) {
      usuario.apellido = updateUsuarioDto.apellido;
    }

    if (updateUsuarioDto.correo !== undefined) {
      usuario.correo = updateUsuarioDto.correo;
    }

    if (updateUsuarioDto.password !== undefined) {
      usuario.password_hash = await bcrypt.hash(updateUsuarioDto.password, 10);
    }

    if (updateUsuarioDto.codigo_estudiante !== undefined) {
      usuario.codigo_estudiante = updateUsuarioDto.codigo_estudiante;
    }

    if (updateUsuarioDto.pin_hash !== undefined) {
      usuario.pin_hash = updateUsuarioDto.pin_hash;
    }

    if (updateUsuarioDto.id_comunidad !== undefined) {
      usuario.id_comunidad = updateUsuarioDto.id_comunidad;
    }

    if (updateUsuarioDto.id_grado !== undefined) {
      const grado = await this.gradoRepository.findOneBy({
        id: updateUsuarioDto.id_grado,
      });

      if (!grado) {
        throw new NotFoundException(
          `El grado con ID ${updateUsuarioDto.id_grado} no existe`,
        );
      }

      usuario.id_grado = grado.id;
      usuario.grado = grado;
    }

    if (updateUsuarioDto.estado !== undefined) {
      usuario.estado = updateUsuarioDto.estado;
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

      usuario.rol_id = rol.id;
      usuario.rol = rol;
    }

    return this.usuarioRepository.save(usuario);
  }

  async eliminar(id: number): Promise<void> {
    const usuario = await this.obtenerUno(id);

    await this.usuarioRepository.remove(usuario);
  }
}
