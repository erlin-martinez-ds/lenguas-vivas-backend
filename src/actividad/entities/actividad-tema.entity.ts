
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Actividad } from './actividad.entity';
import { Tema } from '../../tema/entities/tema.entity';

@Entity('actividad_tema')
export class ActividadTema {
  @PrimaryColumn({ name: 'id_actividad', type: 'int', unsigned: true })
  idActividad: number;

  @PrimaryColumn({ name: 'id_tema', type: 'int', unsigned: true })
  idTema: number;

  @ManyToOne(() => Actividad, (actividad) => actividad.temas, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_actividad', referencedColumnName: 'idActividad' })
  actividad: Actividad;

  @ManyToOne(() => Tema, { nullable: false })
  @JoinColumn({ name: 'id_tema', referencedColumnName: 'idTema' })
  tema: Tema;
}
