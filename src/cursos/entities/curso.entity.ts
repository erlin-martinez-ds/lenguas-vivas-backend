import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cursos')
export class Curso {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  creditos: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;
}