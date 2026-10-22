
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Lengua } from '../../lengua/entities/lengua.entity';
import { Nivel } from '../../nivel/entities/nivel.entity';

export enum EstadoEvaluacion {
  ACTIVA = 'ACTIVA',
  INACTIVA = 'INACTIVA',
}

@Entity('evaluaciones')
export class Evaluacion {
  @PrimaryGeneratedColumn({
    name: 'id_evaluacion',
    type: 'int',
    unsigned: true,
  })
  idEvaluacion: number;

  @Column({
    name: 'id_lengua',
    type: 'int',
    unsigned: true,
  })
  idLengua: number;

  @ManyToOne(() => Lengua, { nullable: false })
  @JoinColumn({ name: 'id_lengua' })
  lengua: Lengua;

  @Column({
    name: 'id_nivel',
    type: 'tinyint',
    unsigned: true,
  })
  idNivel: number;

  @ManyToOne(() => Nivel, { nullable: false })
  @JoinColumn({
    name: 'id_nivel',
    referencedColumnName: 'idNivel',
  })
  nivel: Nivel;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({
    name: 'porcentaje_aprobacion',
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 60.0,
  })
  porcentajeAprobacion: number;

  @Column({
    name: 'max_intentos',
    type: 'tinyint',
    unsigned: true,
    default: 2,
  })
  maxIntentos: number;

  @Column({
    type: 'enum',
    enum: EstadoEvaluacion,
    default: EstadoEvaluacion.ACTIVA,
  })
  estado: EstadoEvaluacion;
}
