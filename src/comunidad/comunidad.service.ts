import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comunidad } from './entities/comunidad.entity';
import { CreateComunidadDto } from './dto/create-comunidad.dto';

@Injectable()
export class ComunidadService {
  constructor(
    @InjectRepository(Comunidad)
    private readonly comunidadRepository: Repository<Comunidad>,
  ) {}

  crear(createComunidadDto: CreateComunidadDto): Promise<Comunidad> {
    const comunidad = this.comunidadRepository.create(createComunidadDto);
    return this.comunidadRepository.save(comunidad);
  }

  obtenerTodas(): Promise<Comunidad[]> {
    return this.comunidadRepository.find();
  }
}