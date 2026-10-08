import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Usuario } from '../../usuario/entities/usuario.entity';
import { Institucion } from '../../institucion/entities/institucion.entity';

@Entity('usuario_institucion')
export class UsuarioInstitucion {
  @PrimaryColumn({
    name: 'id_usuario',
    type: 'int',
    unsigned: true,
  })
  id_usuario: number;

  @PrimaryColumn({
    name: 'id_institucion',
    type: 'int',
    unsigned: true,
  })
  id_institucion: number;

  @Column({
    type: 'enum',
    enum: ['ACTIVO', 'INACTIVO'],
    default: 'ACTIVO',
  })
  estado: 'ACTIVO' | 'INACTIVO';

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Institucion, { nullable: false })
  @JoinColumn({ name: 'id_institucion' })
  institucion: Institucion;
}