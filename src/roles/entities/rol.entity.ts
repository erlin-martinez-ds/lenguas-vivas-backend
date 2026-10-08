import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn({ name: 'id_rol' })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];
}
