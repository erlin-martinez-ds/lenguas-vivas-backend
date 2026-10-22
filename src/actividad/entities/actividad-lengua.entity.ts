
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Actividad } from './actividad.entity';
import { Lengua } from '../../lengua/entities/lengua.entity';

export enum EstadoActividadLengua {
  ACTIVA = 'ACTIVA',
  INACTIVA = 'INACTIVA',
}

@Entity('actividad_lengua')
export class ActividadLengua {
  @PrimaryColumn({ name: 'id_actividad', type: 'int', unsigned: true })
  idActividad: number;

  @PrimaryColumn({ name: 'id_lengua', type: 'int', unsigned: true })
  idLengua: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.lenguas, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_actividad', referencedColumnName: 'idActividad' })
  actividad: Actividad;

  @ManyToOne(() => Lengua, { nullable: false })
  @JoinColumn({ name: 'id_lengua' })
  lengua: Lengua;

  @Column({
    type: 'enum',
    enum: EstadoActividadLengua,
    default: EstadoActividadLengua.ACTIVA,
  })
  estado: EstadoActividadLengua;
}
