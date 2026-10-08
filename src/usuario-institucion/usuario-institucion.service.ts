import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsuarioInstitucion } from './entities/usuario-institucion.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Institucion } from '../institucion/entities/institucion.entity';
import { CreateUsuarioInstitucionDto } from './dto/create-usuario-institucion.dto';

@Injectable()
export class UsuarioInstitucionService {
  constructor(
    @InjectRepository(UsuarioInstitucion)
    private readonly usuarioInstitucionRepository: Repository<UsuarioInstitucion>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Institucion)
    private readonly institucionRepository: Repository<Institucion>,
  ) {}

  async crear(
    createDto: CreateUsuarioInstitucionDto,
  ): Promise<UsuarioInstitucion> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id: createDto.id_usuario },
      relations: {
        rol: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException('El usuario no existe');
    }

    const institucion = await this.institucionRepository.findOne({
      where: { id: createDto.id_institucion },
    });

    if (!institucion) {
      throw new NotFoundException('La institución no existe');
    }
    if (
      usuario.rol.nombre === 'ESTUDIANTE' ||
      usuario.rol.nombre === 'DOCENTE'
    ) {
      const asignacionActiva = await this.usuarioInstitucionRepository.findOne({
        where: {
          id_usuario: createDto.id_usuario,
          estado: 'ACTIVO',
        },
      });

      if (asignacionActiva) {
        throw new ConflictException(
          `${usuario.rol.nombre} ya tiene una institución activa asignada`,
        );
      }
    }
    const asignacionExistente = await this.usuarioInstitucionRepository.findOne(
      {
        where: {
          id_usuario: createDto.id_usuario,
          id_institucion: createDto.id_institucion,
        },
      },
    );

    if (asignacionExistente) {
      throw new ConflictException(
        'El usuario ya está asignado a esta institución',
      );
    }

    const asignacion = this.usuarioInstitucionRepository.create({
      id_usuario: createDto.id_usuario,
      id_institucion: createDto.id_institucion,
      estado: createDto.estado,
    });

    return this.usuarioInstitucionRepository.save(asignacion);
  }
}
