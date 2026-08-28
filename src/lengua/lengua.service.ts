import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lengua } from './entities/lengua.entity';
import { CreateLenguaDto } from './dto/create-lengua.dto';
import { Comunidad } from '../comunidad/entities/comunidad.entity';

@Injectable()
export class LenguaService {
  constructor(
    @InjectRepository(Lengua)
    private readonly lenguaRepository: Repository<Lengua>,
    @InjectRepository(Comunidad)
    private readonly comunidadRepository: Repository<Comunidad>,
  ) {}

  async crear(createLenguaDto: CreateLenguaDto): Promise<Lengua> {
    const comunidad = await this.comunidadRepository.findOneBy({ id: createLenguaDto.comunidadId });

    if (!comunidad) {
      throw new NotFoundException(`La comunidad con ID ${createLenguaDto.comunidadId} no existe`);
    }

    const nuevaLengua = this.lenguaRepository.create({
      nombre: createLenguaDto.nombre,
      comunidad: comunidad,
    });

    return this.lenguaRepository.save(nuevaLengua);
  }

  obtenerTodas(): Promise<Lengua[]> {
    return this.lenguaRepository.find({ relations: { comunidad: true } });
  }
}