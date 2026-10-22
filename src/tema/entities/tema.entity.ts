
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum EstadoTema {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

@Entity('temas')
export class Tema {
  @PrimaryGeneratedColumn({
    name: 'id_tema',
    type: 'int',
    unsigned: true,
  })
  idTema: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  nombre: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion: string | null;

  @Column({
    type: 'enum',
    enum: EstadoTema,
    default: EstadoTema.ACTIVO,
  })
  estado: EstadoTema;
}
