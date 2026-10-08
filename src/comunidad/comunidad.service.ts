import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comunidad } from './entities/comunidad.entity';
import { CreateComunidadDto } from './dto/create-comunidad.dto';
import { UpdateComunidadDto } from './dto/update-comunidad.dto';
import { Lengua } from '../lengua/entities/lengua.entity';

@Injectable()
export class ComunidadService {
  constructor(
    @InjectRepository(Comunidad)
    private readonly comunidadRepository: Repository<Comunidad>,

    @InjectRepository(Lengua)
    private readonly lenguaRepository: Repository<Lengua>,
  ) {}

  private async validarNombreDuplicado(
    nombre: string,
    excludeId?: number,
  ): Promise<void> {
    const nombreNormalizado = nombre.trim().toLowerCase();

    const existente = await this.comunidadRepository
      .createQueryBuilder('comunidad')
      .where('LOWER(TRIM(comunidad.nombre)) = :nombre', {
        nombre: nombreNormalizado,
      })
      .andWhere(excludeId ? 'comunidad.id != :excludeId' : '1 = 1', {
        excludeId,
      })
      .getOne();

    if (existente) {
      throw new ConflictException(
        `La comunidad "${nombre}" ya está registrada`,
      );
    }
  }

  async crear(createComunidadDto: CreateComunidadDto): Promise<Comunidad> {
    await this.validarNombreDuplicado(createComunidadDto.nombre);

    const lengua = await this.lenguaRepository.findOneBy({
      id: createComunidadDto.id_lengua,
    });

    if (!lengua) {
      throw new NotFoundException(
        `La lengua con ID ${createComunidadDto.id_lengua} no existe`,
      );
    }

    const comunidad = this.comunidadRepository.create({
      nombre: createComunidadDto.nombre,
      descripcion: createComunidadDto.descripcion ?? null,
      estado: createComunidadDto.estado ?? 'ACTIVA',
      id_lengua: lengua.id,
    });

    return await this.comunidadRepository.save(comunidad);
  }

  async obtenerTodas(): Promise<Comunidad[]> {
    return await this.comunidadRepository.find({
      relations: {
        lengua: true,
      },
    });
  }

  async obtenerUna(id: number): Promise<Comunidad> {
    const comunidad = await this.comunidadRepository.findOne({
      where: { id },
      relations: {
        lengua: true,
      },
    });

    if (!comunidad) {
      throw new NotFoundException(`La comunidad con ID ${id} no existe`);
    }

    return comunidad;
  }

  async actualizar(
    id: number,
    updateComunidadDto: UpdateComunidadDto,
  ): Promise<Comunidad> {
    const comunidad = await this.obtenerUna(id);

    if (updateComunidadDto.nombre !== undefined) {
      await this.validarNombreDuplicado(updateComunidadDto.nombre, id);
      comunidad.nombre = updateComunidadDto.nombre;
    }

    if (updateComunidadDto.descripcion !== undefined) {
      comunidad.descripcion = updateComunidadDto.descripcion;
    }

    if (updateComunidadDto.estado !== undefined) {
      comunidad.estado = updateComunidadDto.estado;
    }

    if (updateComunidadDto.id_lengua !== undefined) {
      const lengua = await this.lenguaRepository.findOneBy({
        id: updateComunidadDto.id_lengua,
      });

      if (!lengua) {
        throw new NotFoundException(
          `La lengua con ID ${updateComunidadDto.id_lengua} no existe`,
        );
      }

      comunidad.id_lengua = lengua.id;
      comunidad.lengua = lengua;
    }

    return await this.comunidadRepository.save(comunidad);
  }

  async eliminar(id: number): Promise<void> {
    const comunidad = await this.obtenerUna(id);

    await this.comunidadRepository.remove(comunidad);
  }
}