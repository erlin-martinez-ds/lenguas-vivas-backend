import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Lengua } from './entities/lengua.entity';

import { CreateLenguaDto } from './dto/create-lengua.dto';

import { UpdateLenguaDto } from './dto/update-lengua.dto';

@Injectable()
export class LenguaService {
  constructor(
    @InjectRepository(Lengua)
    private readonly lenguaRepository: Repository<Lengua>,
  ) {}

  async crear(createLenguaDto: CreateLenguaDto): Promise<Lengua> {
    const nuevaLengua = this.lenguaRepository.create({
      nombre: createLenguaDto.nombre,
      descripcion: createLenguaDto.descripcion ?? null,
      estado: createLenguaDto.estado ?? 'ACTIVA',
    });

    return await this.lenguaRepository.save(nuevaLengua);
  }

  async obtenerTodas(): Promise<Lengua[]> {
    return await this.lenguaRepository.find({
      relations: {
        comunidades: true,
      },
    });
  }

  async obtenerUna(id: number): Promise<Lengua> {
    const lengua = await this.lenguaRepository.findOne({
      where: { id },
      relations: {
        comunidades: true,
      },
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

    if (updateLenguaDto.nombre !== undefined) {
      lengua.nombre = updateLenguaDto.nombre;
    }

    if (updateLenguaDto.descripcion !== undefined) {
      lengua.descripcion = updateLenguaDto.descripcion;
    }

    if (updateLenguaDto.estado !== undefined) {
      lengua.estado = updateLenguaDto.estado;
    }

    return await this.lenguaRepository.save(lengua);
  }

  async eliminar(id: number): Promise<void> {
    const lengua = await this.obtenerUna(id);

    await this.lenguaRepository.remove(lengua);
  }
}