import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import {
  Actividad,
  EstadoActividad,
  EstadoAprobacionActividad,
} from './entities/actividad.entity';
import {
  ActividadLengua,
  EstadoActividadLengua,
} from './entities/actividad-lengua.entity';
import { ActividadTema } from './entities/actividad-tema.entity';
import { Nivel } from '../nivel/entities/nivel.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';

@Injectable()
export class ActividadService {
  constructor(private readonly dataSource: DataSource) {}

  async crear(dto: CreateActividadDto, idCreador: number) {
    return this.dataSource.transaction((manager) =>
      this.conUsuarioAuditoria(manager, idCreador, async () => {
        const nivel = await manager.getRepository(Nivel).findOne({
          where: { idNivel: dto.idNivel },
        });

        if (!nivel) {
          throw new NotFoundException('El nivel indicado no existe');
        }

        const creador = await manager.getRepository(Usuario).findOne({
          where: { id: idCreador },
        });

        if (!creador) {
          throw new NotFoundException('El usuario creador no existe');
        }

        await this.validarLenguas(manager, dto.idLenguas ?? []);
        await this.validarTemas(manager, dto.idTemas ?? []);

        const repositorio = manager.getRepository(Actividad);
        const actividad = repositorio.create({
          idNivel: dto.idNivel,
          idCreador,
          titulo: dto.titulo,
          descripcion: dto.descripcion ?? null,
          estado: dto.estado ?? EstadoActividad.ACTIVA,
          estadoAprobacion: EstadoAprobacionActividad.PENDIENTE,
        });

        const guardada = await repositorio.save(actividad);

        if (dto.idLenguas?.length) {
          await manager.getRepository(ActividadLengua).save(
            dto.idLenguas.map((idLengua) => ({
              idActividad: guardada.idActividad,
              idLengua,
              estado: EstadoActividadLengua.ACTIVA,
            })),
          );
        }

        if (dto.idTemas?.length) {
          await manager.getRepository(ActividadTema).save(
            dto.idTemas.map((idTema) => ({
              idActividad: guardada.idActividad,
              idTema,
            })),
          );
        }

        return this.obtenerDesdeManager(manager, guardada.idActividad);
      }),
    );
  }

  async listar() {
    return this.dataSource.getRepository(Actividad).find({
      relations: {
        nivel: true,
        creador: true,
        lenguas: { lengua: true },
        temas: { tema: true },
      },
      order: { idActividad: 'DESC' },
    });
  }

  async obtenerPorId(id: number) {
    const actividad = await this.dataSource.getRepository(Actividad).findOne({
      where: { idActividad: id },
      relations: {
        nivel: true,
        creador: true,
        lenguas: { lengua: true },
        temas: { tema: true },
      },
    });

    if (!actividad) {
      throw new NotFoundException('La actividad no existe');
    }

    return actividad;
  }

  async actualizar(id: number, dto: UpdateActividadDto, idUsuario: number) {
    return this.dataSource.transaction((manager) =>
      this.conUsuarioAuditoria(manager, idUsuario, async () => {
        const repositorio = manager.getRepository(Actividad);
        const actividad = await repositorio.findOne({
          where: { idActividad: id },
        });

        if (!actividad) {
          throw new NotFoundException('La actividad no existe');
        }

        if (dto.idNivel !== undefined) {
          const nivel = await manager.getRepository(Nivel).findOne({
            where: { idNivel: dto.idNivel },
          });

          if (!nivel) {
            throw new NotFoundException('El nivel indicado no existe');
          }
        }

        if (dto.idLenguas !== undefined) {
          await this.validarLenguas(manager, dto.idLenguas);
        }

        if (dto.idTemas !== undefined) {
          await this.validarTemas(manager, dto.idTemas);
        }

        const { idLenguas, idTemas, ...datos } = dto;
        Object.assign(actividad, datos);
        await repositorio.save(actividad);

        if (idLenguas !== undefined) {
          const relacionLenguaRepo = manager.getRepository(ActividadLengua);

          await relacionLenguaRepo.delete({ idActividad: id });

          if (idLenguas.length) {
            await relacionLenguaRepo.save(
              idLenguas.map((idLengua) => ({
                idActividad: id,
                idLengua,
                estado: EstadoActividadLengua.ACTIVA,
              })),
            );
          }
        }

        if (idTemas !== undefined) {
          const relacionTemaRepo = manager.getRepository(ActividadTema);

          await relacionTemaRepo.delete({ idActividad: id });

          if (idTemas.length) {
            await relacionTemaRepo.save(
              idTemas.map((idTema) => ({
                idActividad: id,
                idTema,
              })),
            );
          }
        }

        return this.obtenerDesdeManager(manager, id);
      }),
    );
  }

  async cambiarAprobacion(
    id: number,
    estadoAprobacion: EstadoAprobacionActividad,
    idUsuario: number,
  ) {
    if (
      estadoAprobacion !== EstadoAprobacionActividad.APROBADA &&
      estadoAprobacion !== EstadoAprobacionActividad.RECHAZADA
    ) {
      throw new BadRequestException(
        'La aprobación debe ser APROBADA o RECHAZADA',
      );
    }

    return this.dataSource.transaction((manager) =>
      this.conUsuarioAuditoria(manager, idUsuario, async () => {
        const repositorio = manager.getRepository(Actividad);

        const actividad = await repositorio.findOne({
          where: { idActividad: id },
        });

        if (!actividad) {
          throw new NotFoundException('La actividad no existe');
        }

        actividad.estadoAprobacion = estadoAprobacion;
        await repositorio.save(actividad);

        return this.obtenerDesdeManager(manager, id);
      }),
    );
  }
  private async conUsuarioAuditoria<T>(
    manager: EntityManager,
    idUsuario: number,
    operacion: () => Promise<T>,
  ): Promise<T> {
    await manager.query('SET @usuario_id = ?', [idUsuario]);

    try {
      return await operacion();
    } finally {
      await manager.query('SET @usuario_id = NULL');
    }
  }
  private async obtenerDesdeManager(manager: EntityManager, id: number) {
    const actividad = await manager.getRepository(Actividad).findOne({
      where: { idActividad: id },
      relations: {
        nivel: true,
        creador: true,
        lenguas: { lengua: true },
        temas: { tema: true },
      },
    });

    if (!actividad) {
      throw new NotFoundException('La actividad no existe');
    }

    return actividad;
  }

  private async validarLenguas(manager: EntityManager, ids: number[]) {
    if (!ids.length) return;

    const placeholders = ids.map(() => '?').join(', ');
    const resultados: { id_lengua: number }[] = await manager.query(
      `SELECT id_lengua FROM lenguas WHERE id_lengua IN (${placeholders})`,
      ids,
    );

    if (resultados.length !== ids.length) {
      throw new BadRequestException('Una o más lenguas indicadas no existen');
    }
  }

  private async validarTemas(manager: EntityManager, ids: number[]) {
    if (!ids.length) return;

    const placeholders = ids.map(() => '?').join(', ');
    const resultados: { id_tema: number }[] = await manager.query(
      `SELECT id_tema FROM temas WHERE id_tema IN (${placeholders})`,
      ids,
    );

    if (resultados.length !== ids.length) {
      throw new BadRequestException('Uno o más temas indicados no existen');
    }
  }
}
