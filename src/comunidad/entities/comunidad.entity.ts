import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lengua } from '../../lengua/entities/lengua.entity';

@Entity('comunidades')
export class Comunidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => Lengua, (lengua) => lengua.comunidad)
  lenguas: Lengua[];
}