
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Evaluacion } from './entities/evaluacion.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';
import { Nivel } from '../nivel/entities/nivel.entity';

@Injectable()
export class EvaluacionService {
  constructor(private readonly dataSource: DataSource) {}

  async crear(dto: CreateEvaluacionDto) {
    await this.validarLengua(dto.idLengua);
    await this.validarNivel(dto.idNivel);

    const repositorio = this.dataSource.getRepository(Evaluacion);

    const evaluacion = repositorio.create({
      idLengua: dto.idLengua,
      idNivel: dto.idNivel,
      nombre: dto.nombre,
      porcentajeAprobacion: dto.porcentajeAprobacion ?? 60,
      maxIntentos: dto.maxIntentos ?? 2,
      estado: dto.estado,
    });

    return repositorio.save(evaluacion);
  }

  async listar() {
    return this.dataSource.getRepository(Evaluacion).find({
      relations: {
        lengua: true,
        nivel: true,
      },
      order: {
        idEvaluacion: 'DESC',
      },
    });
  }

  async obtenerPorId(id: number) {
    const evaluacion = await this.dataSource
      .getRepository(Evaluacion)
      .findOne({
        where: { idEvaluacion: id },
        relations: {
          lengua: true,
          nivel: true,
        },
      });

    if (!evaluacion) {
      throw new NotFoundException('La evaluación no existe');
    }

    return evaluacion;
  }

  async actualizar(id: number, dto: UpdateEvaluacionDto) {
    const repositorio = this.dataSource.getRepository(Evaluacion);

    const evaluacion = await repositorio.findOne({
      where: { idEvaluacion: id },
    });

    if (!evaluacion) {
      throw new NotFoundException('La evaluación no existe');
    }

    if (dto.idLengua !== undefined) {
      await this.validarLengua(dto.idLengua);
    }

    if (dto.idNivel !== undefined) {
      await this.validarNivel(dto.idNivel);
    }

    Object.assign(evaluacion, dto);

    await repositorio.save(evaluacion);

    return this.obtenerPorId(id);
  }

  private async validarLengua(idLengua: number) {
    const resultados: { id_lengua: number }[] =
      await this.dataSource.query(
        'SELECT id_lengua FROM lenguas WHERE id_lengua = ?',
        [idLengua],
      );

    if (resultados.length === 0) {
      throw new NotFoundException('La lengua indicada no existe');
    }
  }

  private async validarNivel(idNivel: number) {
    const nivel = await this.dataSource.getRepository(Nivel).findOne({
      where: { idNivel },
    });

    if (!nivel) {
      throw new NotFoundException('El nivel indicado no existe');
    }
  }
}
