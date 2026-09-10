import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lengua } from '../../lengua/entities/lengua.entity';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  creditos: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ManyToOne(() => Lengua, (lengua) => lengua.cursos, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'lengua_id' })
  lengua: Lengua;
}
