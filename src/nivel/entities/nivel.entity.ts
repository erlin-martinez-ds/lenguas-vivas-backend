import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum EstadoNivel {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

@Entity('niveles')
export class Nivel {
  @PrimaryColumn({
    name: 'id_nivel',
    type: 'tinyint',
    unsigned: true,
  })
  idNivel: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  nombre: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
    unique: true,
  })
  orden: number;

  @Column({
    type: 'enum',
    enum: EstadoNivel,
    default: EstadoNivel.ACTIVO,
  })
  estado: EstadoNivel;
}