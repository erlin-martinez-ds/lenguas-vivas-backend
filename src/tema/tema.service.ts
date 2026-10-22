
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tema } from './entities/tema.entity';
import { CreateTemaDto } from './dto/create-tema.dto';
import { UpdateTemaDto } from './dto/update-tema.dto';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private readonly temaRepository: Repository<Tema>,
  ) {}

  async crear(dto: CreateTemaDto): Promise<Tema> {
    const tema = this.temaRepository.create(dto);
    return this.temaRepository.save(tema);
  }

  async obtenerTodos(): Promise<Tema[]> {
    return this.temaRepository.find({
      order: { idTema: 'ASC' },
    });
  }

  async obtenerUno(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({
      where: { idTema: id },
    });

    if (!tema) {
      throw new NotFoundException(
        `No se encontró el tema con ID ${id}`,
      );
    }

    return tema;
  }

  async actualizar(
    id: number,
    dto: UpdateTemaDto,
  ): Promise<Tema> {
    const tema = await this.obtenerUno(id);
    Object.assign(tema, dto);
    return this.temaRepository.save(tema);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const tema = await this.obtenerUno(id);
    await this.temaRepository.remove(tema);

    return { mensaje: 'Tema eliminado correctamente' };
  }
}
