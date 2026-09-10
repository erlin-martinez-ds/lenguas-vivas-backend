import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Curso } from './entities/curso.entity';
import { Lengua } from '../lengua/entities/lengua.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,

    @InjectRepository(Lengua)
    private readonly lenguaRepository: Repository<Lengua>,
  ) {}

  async crear(createCursoDto: CreateCursoDto): Promise<Curso> {
    const lengua = await this.lenguaRepository.findOneBy({
      id: createCursoDto.lenguaId,
    });

    if (!lengua) {
      throw new NotFoundException(
        `La lengua con ID ${createCursoDto.lenguaId} no existe`,
      );
    }

    const curso = this.cursoRepository.create({
      nombre: createCursoDto.nombre,
      descripcion: createCursoDto.descripcion,
      creditos: createCursoDto.creditos,
      activo: createCursoDto.activo,
      lengua,
    });

    return this.cursoRepository.save(curso);
  }

  async obtenerTodos(): Promise<Curso[]> {
    return this.cursoRepository.find();
  }

  async obtenerUno(id: number): Promise<Curso> {
    const curso = await this.cursoRepository.findOne({
      where: { id },
    });

    if (!curso) {
      throw new NotFoundException(`El curso con ID ${id} no existe`);
    }

    return curso;
  }

  async actualizar(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const curso = await this.obtenerUno(id);

    if (updateCursoDto.lenguaId !== undefined) {
      const lengua = await this.lenguaRepository.findOneBy({
        id: updateCursoDto.lenguaId,
      });

      if (!lengua) {
        throw new NotFoundException(
          `La lengua con ID ${updateCursoDto.lenguaId} no existe`,
        );
      }

      curso.lengua = lengua;
    }

    if (updateCursoDto.nombre !== undefined) {
      curso.nombre = updateCursoDto.nombre;
    }

    if (updateCursoDto.descripcion !== undefined) {
      curso.descripcion = updateCursoDto.descripcion;
    }

    if (updateCursoDto.creditos !== undefined) {
      curso.creditos = updateCursoDto.creditos;
    }

    if (updateCursoDto.activo !== undefined) {
      curso.activo = updateCursoDto.activo;
    }

    return this.cursoRepository.save(curso);
  }

  async eliminar(id: number): Promise<void> {
    const curso = await this.obtenerUno(id);
    await this.cursoRepository.remove(curso);
  }
}
