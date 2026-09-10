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

@Injectable()
export class ComunidadService {
  constructor(
    @InjectRepository(Comunidad)
    private readonly comunidadRepository: Repository<Comunidad>,
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

    const comunidad = this.comunidadRepository.create(createComunidadDto);

    return this.comunidadRepository.save(comunidad);
  }

  obtenerTodas(): Promise<Comunidad[]> {
    return this.comunidadRepository.find();
  }

  async obtenerUna(id: number): Promise<Comunidad> {
    const comunidad = await this.comunidadRepository.findOne({
      where: { id },
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

    return this.comunidadRepository.save(comunidad);
  }

  async eliminar(id: number): Promise<void> {
    const comunidad = await this.obtenerUna(id);

    await this.comunidadRepository.remove(comunidad);
  }
}
