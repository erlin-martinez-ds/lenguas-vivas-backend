import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { UsuarioInstitucion } from '../../usuario-institucion/entities/usuario-institucion.entity';

@Entity('instituciones')
export class Institucion {
  @PrimaryGeneratedColumn({ name: 'id_institucion' })
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  direccion: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  municipio: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  departamento: string;

  @Column({
    type: 'enum',
    enum: ['ACTIVA', 'INACTIVA'],
    default: 'ACTIVA',
  })
  estado: 'ACTIVA' | 'INACTIVA';

  @OneToMany(
    () => UsuarioInstitucion,
    (usuarioInstitucion) => usuarioInstitucion.institucion,
  )
  usuarios: UsuarioInstitucion[];
}
