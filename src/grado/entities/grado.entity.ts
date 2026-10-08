import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('grados')
export class Grado {
  @PrimaryGeneratedColumn({ name: 'id_grado' })
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  nombre: string;
}