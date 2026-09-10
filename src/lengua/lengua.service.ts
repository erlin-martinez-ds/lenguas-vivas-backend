import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lengua } from './entities/lengua.entity';
import { CreateLenguaDto } from './dto/create-lengua.dto';
import { UpdateLenguaDto } from './dto/update-lengua.dto';
import { Comunidad } from '../comunidad/entities/comunidad.entity';

@Injectable()
export class LenguaService {
  constructor(
    @InjectRepository(Lengua)
    private readonly lenguaRepository: Repository<Lengua>,

    @InjectRepository(Comunidad)
    private readonly comunidadRepository: Repository<Comunidad>,
  ) {}

  private normalizarNombre(nombre: string): string {
    return nombre.trim().toLowerCase();
  }

  private async validarLenguaDuplicada(
    nombre: string,
    comunidadId: number,
    excludeId?: number,
  ): Promise<void> {
    const nombreNormalizado = this.normalizarNombre(nombre);

    const existente = await this.lenguaRepository
      .createQueryBuilder('lengua')
      .innerJoin('lengua.comunidad', 'comunidad')
      .where('LOWER(TRIM(lengua.nombre)) = :nombre', {
        nombre: nombreNormalizado,
      })
      .andWhere('comunidad.id = :comunidadId', { comunidadId })
      .andWhere(excludeId ? 'lengua.id != :excludeId' : '1 = 1', {
        excludeId,
      })
      .getOne();

    if (existente) {
      throw new ConflictException(
        `La lengua "${nombre}" ya está registrada en esta comunidad`,
      );
    }
  }

  async crear(createLenguaDto: CreateLenguaDto): Promise<Lengua> {
    const comunidad = await this.comunidadRepository.findOneBy({
      id: createLenguaDto.comunidadId,
    });

    if (!comunidad) {
      throw new NotFoundException(
        `La comunidad con ID ${createLenguaDto.comunidadId} no existe`,
      );
    }

    await this.validarLenguaDuplicada(
      createLenguaDto.nombre,
      createLenguaDto.comunidadId,
    );

    const nuevaLengua = this.lenguaRepository.create({
      nombre: createLenguaDto.nombre,
      comunidad,
    });

    return this.lenguaRepository.save(nuevaLengua);
  }

  obtenerTodas(): Promise<Lengua[]> {
    return this.lenguaRepository.find();
  }

  async obtenerUna(id: number): Promise<Lengua> {
    const lengua = await this.lenguaRepository.findOne({
      where: { id },
    });

    if (!lengua) {
      throw new NotFoundException(`La lengua con ID ${id} no existe`);
    }

    return lengua;
  }

  async actualizar(
    id: number,
    updateLenguaDto: UpdateLenguaDto,
  ): Promise<Lengua> {
    const lengua = await this.obtenerUna(id);

    const comunidadIdFinal =
      updateLenguaDto.comunidadId ?? lengua.comunidad?.id;
    const nombreFinal = updateLenguaDto.nombre ?? lengua.nombre;

    if (updateLenguaDto.comunidadId !== undefined) {
      const comunidad = await this.comunidadRepository.findOneBy({
        id: updateLenguaDto.comunidadId,
      });

      if (!comunidad) {
        throw new NotFoundException(
          `La comunidad con ID ${updateLenguaDto.comunidadId} no existe`,
        );
      }

      lengua.comunidad = comunidad;
    }

    if (updateLenguaDto.nombre !== undefined) {
      lengua.nombre = updateLenguaDto.nombre;
    }

    if (
      (updateLenguaDto.nombre !== undefined ||
        updateLenguaDto.comunidadId !== undefined) &&
      comunidadIdFinal !== undefined
    ) {
      await this.validarLenguaDuplicada(nombreFinal, comunidadIdFinal, id);
    }

    return this.lenguaRepository.save(lengua);
  }

  async eliminar(id: number): Promise<void> {
    const lengua = await this.obtenerUna(id);
    await this.lenguaRepository.remove(lengua);
  }
}
