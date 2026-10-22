import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Nivel, EstadoNivel } from './entities/nivel.entity';
import { CreateNivelDto } from './dto/create-nivel.dto';
import { UpdateNivelDto } from './dto/update-nivel.dto';

@Injectable()
export class NivelService {
  constructor(
    @InjectRepository(Nivel)
    private readonly nivelRepository: Repository<Nivel>,
  ) {}

  async crear(dto: CreateNivelDto): Promise<Nivel> {
    const nivel = this.nivelRepository.create({
      ...dto,
      estado: dto.estado ?? EstadoNivel.ACTIVO,
    });

    return this.nivelRepository.save(nivel);
  }

  async obtenerTodos(): Promise<Nivel[]> {
    return this.nivelRepository.find({
      order: { orden: 'ASC' },
    });
  }

  async obtenerUno(id: number): Promise<Nivel> {
    const nivel = await this.nivelRepository.findOne({
      where: { idNivel: id },
    });

    if (!nivel) {
      throw new NotFoundException(
        `No se encontró el nivel con ID ${id}`,
      );
    }

    return nivel;
  }

  async actualizar(
    id: number,
    dto: UpdateNivelDto,
  ): Promise<Nivel> {
    const nivel = await this.obtenerUno(id);

    Object.assign(nivel, dto);

    return this.nivelRepository.save(nivel);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const nivel = await this.obtenerUno(id);

    await this.nivelRepository.remove(nivel);

    return { mensaje: 'Nivel eliminado correctamente' };
  }
}