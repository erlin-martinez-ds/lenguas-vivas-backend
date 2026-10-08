import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Comunidad } from '../../comunidad/entities/comunidad.entity';

@Entity('lenguas')
export class Lengua {
  @PrimaryGeneratedColumn({ name: 'id_lengua' })
  id: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({
    type: 'enum',
    enum: ['ACTIVA', 'INACTIVA'],
    default: 'ACTIVA',
  })
  estado: 'ACTIVA' | 'INACTIVA';

  @Column({
    name: 'disponible_estudiantes',
    type: 'boolean',
    default: false,
  })
  disponible_estudiantes: boolean;
  boolean;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => Comunidad, (comunidad) => comunidad.lengua)
  comunidades: Comunidad[];
}
