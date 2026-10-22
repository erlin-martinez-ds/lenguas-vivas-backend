
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Grado } from './entities/grado.entity';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';

@Injectable()
export class GradoService {
  constructor(
    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
  ) {}

  async crear(createGradoDto: CreateGradoDto): Promise<Grado> {
    const nuevoGrado = this.gradoRepository.create({
      nombre: createGradoDto.nombre,
    });

    return await this.gradoRepository.save(nuevoGrado);
  }

  async obtenerTodos(): Promise<Grado[]> {
    return await this.gradoRepository.find();
  }

  async obtenerUno(id: number): Promise<Grado> {
    const grado = await this.gradoRepository.findOne({
      where: { id },
    });

    if (!grado) {
      throw new NotFoundException(
        `El grado con ID ${id} no existe`,
      );
    }

    return grado;
  }

  async actualizar(
    id: number,
    updateGradoDto: UpdateGradoDto,
  ): Promise<Grado> {
    const grado = await this.obtenerUno(id);

    if (updateGradoDto.nombre !== undefined) {
      grado.nombre = updateGradoDto.nombre;
    }

    return await this.gradoRepository.save(grado);
  }

  async eliminar(id: number): Promise<void> {
    const grado = await this.obtenerUno(id);

    await this.gradoRepository.remove(grado);
  }
}
