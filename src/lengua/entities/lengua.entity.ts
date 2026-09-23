import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comunidad } from '../../comunidad/entities/comunidad.entity';

@Entity('lenguas')
export class Lengua {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ManyToOne(() => Comunidad, (comunidad) => comunidad.lenguas, {
    eager: true,
  })
  @JoinColumn({ name: 'comunidad_id' })
  comunidad: Comunidad;

  
}