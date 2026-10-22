
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Nivel } from '../../nivel/entities/nivel.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ActividadLengua } from './actividad-lengua.entity';
import { ActividadTema } from './actividad-tema.entity';

export enum EstadoActividad {
  ACTIVA = 'ACTIVA',
  INACTIVA = 'INACTIVA',
}

export enum EstadoAprobacionActividad {
  PENDIENTE = 'PENDIENTE',
  APROBADA = 'APROBADA',
  RECHAZADA = 'RECHAZADA',
}

@Entity('actividades')
export class Actividad {
  @PrimaryGeneratedColumn({
    name: 'id_actividad',
    type: 'int',
    unsigned: true,
  })
  idActividad: number;

  @Column({ name: 'id_nivel', type: 'tinyint', unsigned: true })
  idNivel: number;

  @ManyToOne(() => Nivel, { nullable: false })
  @JoinColumn({ name: 'id_nivel', referencedColumnName: 'idNivel' })
  nivel: Nivel;

  @Column({ name: 'id_creador', type: 'int', unsigned: true })
  idCreador: number;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_creador', referencedColumnName: 'id' })
  creador: Usuario;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({
    type: 'enum',
    enum: EstadoActividad,
    default: EstadoActividad.ACTIVA,
  })
  estado: EstadoActividad;

  @Column({
    name: 'estado_aprobacion',
    type: 'enum',
    enum: EstadoAprobacionActividad,
    default: EstadoAprobacionActividad.PENDIENTE,
  })
  estadoAprobacion: EstadoAprobacionActividad;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => ActividadLengua, (relacion) => relacion.actividad)
  lenguas: ActividadLengua[];

  @OneToMany(() => ActividadTema, (relacion) => relacion.actividad)
  temas: ActividadTema[];
}
