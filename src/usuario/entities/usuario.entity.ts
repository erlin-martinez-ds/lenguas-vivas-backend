import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Comunidad } from '../../comunidad/entities/comunidad.entity';
import { Rol } from '../../roles/entities/rol.entity';
import { Grado } from '../../grado/entities/grado.entity';
import { OneToMany } from 'typeorm';
import { UsuarioInstitucion } from '../../usuario-institucion/entities/usuario-institucion.entity';
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: true })
  correo: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password_hash: string | null;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  codigo_estudiante: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pin_hash: string | null;

  @Column({
    type: 'enum',
    enum: ['ACTIVO', 'INACTIVO'],
    default: 'ACTIVO',
  })
  estado: 'ACTIVO' | 'INACTIVO';

  @Column({ name: 'id_comunidad', type: 'int', nullable: true })
  id_comunidad: number | null;

  @ManyToOne(() => Comunidad, { nullable: true })
  @JoinColumn({ name: 'id_comunidad' })
  comunidad: Comunidad;

  @Column({ name: 'id_grado', type: 'int', nullable: true })
  id_grado: number | null;

  @ManyToOne(() => Grado, { nullable: true })
  @JoinColumn({ name: 'id_grado' })
  grado: Grado | null;

  @OneToMany(
    () => UsuarioInstitucion,
    (usuarioInstitucion) => usuarioInstitucion.usuario,
  )
  instituciones: UsuarioInstitucion[];

  @Column({ name: 'rol_id', type: 'int', unsigned: true })
  rol_id: number;

  @ManyToOne(() => Rol, { nullable: false })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
