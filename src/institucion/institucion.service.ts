import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Institucion } from './entities/institucion.entity';

import { CreateInstitucionDto } from './dto/create-institucion.dto';

import { UpdateInstitucionDto } from './dto/update-institucion.dto';

@Injectable()
export class InstitucionService {
  constructor(
    @InjectRepository(Institucion)
    private readonly institucionRepository: Repository<Institucion>,
  ) {}

  private async validarNombreDuplicado(
    nombre: string,
    excludeId?: number,
  ): Promise<void> {
    const nombreNormalizado = nombre.trim().toLowerCase();

    const existente = await this.institucionRepository
      .createQueryBuilder('institucion')
      .where('LOWER(TRIM(institucion.nombre)) = :nombre', {
        nombre: nombreNormalizado,
      })
      .andWhere(
        excludeId
          ? 'institucion.id != :excludeId'
          : '1 = 1',
        {
          excludeId,
        },
      )
      .getOne();

    if (existente) {
      throw new ConflictException(
        `La institución "${nombre}" ya está registrada`,
      );
    }
  }

  async crear(
    createInstitucionDto: CreateInstitucionDto,
  ): Promise<Institucion> {
    await this.validarNombreDuplicado(
      createInstitucionDto.nombre,
    );

    const institucion = this.institucionRepository.create({
      nombre: createInstitucionDto.nombre,
      direccion: createInstitucionDto.direccion,
      municipio: createInstitucionDto.municipio,
      departamento: createInstitucionDto.departamento,
      estado: createInstitucionDto.estado ?? 'ACTIVA',
    });

    return await this.institucionRepository.save(institucion);
  }

  async obtenerTodas(): Promise<Institucion[]> {
    return await this.institucionRepository.find();
  }

  async obtenerUna(id: number): Promise<Institucion> {
    const institucion = await this.institucionRepository.findOne({
      where: { id },
    });

    if (!institucion) {
      throw new NotFoundException(
        `La institución con ID ${id} no existe`,
      );
    }

    return institucion;
  }

  async actualizar(
    id: number,
    updateInstitucionDto: UpdateInstitucionDto,
  ): Promise<Institucion> {
    const institucion = await this.obtenerUna(id);

    if (updateInstitucionDto.nombre !== undefined) {
      await this.validarNombreDuplicado(
        updateInstitucionDto.nombre,
        id,
      );

      institucion.nombre = updateInstitucionDto.nombre;
    }

    if (updateInstitucionDto.direccion !== undefined) {
      institucion.direccion = updateInstitucionDto.direccion;
    }

    if (updateInstitucionDto.municipio !== undefined) {
      institucion.municipio = updateInstitucionDto.municipio;
    }

    if (updateInstitucionDto.departamento !== undefined) {
      institucion.departamento = updateInstitucionDto.departamento;
    }

    if (updateInstitucionDto.estado !== undefined) {
      institucion.estado = updateInstitucionDto.estado;
    }

    return await this.institucionRepository.save(institucion);
  }

  async eliminar(id: number): Promise<void> {
    const institucion = await this.obtenerUna(id);

    try {
      await this.institucionRepository.remove(institucion);
    } catch (error) {
      throw new ConflictException(
        'No se puede eliminar la institución porque tiene registros asociados',
      );
    }
  }
}