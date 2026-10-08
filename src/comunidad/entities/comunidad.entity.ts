import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Lengua } from '../../lengua/entities/lengua.entity';

@Entity('comunidades')
export class Comunidad {
  @PrimaryGeneratedColumn({ name: 'id_comunidad' })
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({
    type: 'enum',
    enum: ['ACTIVA', 'INACTIVA'],
    default: 'ACTIVA',
  })
  estado: 'ACTIVA' | 'INACTIVA';

  @Column({ name: 'id_lengua', type: 'int', unsigned: true })
  id_lengua: number;

  @ManyToOne(() => Lengua, { nullable: false })
  @JoinColumn({ name: 'id_lengua' })
  lengua: Lengua;
}