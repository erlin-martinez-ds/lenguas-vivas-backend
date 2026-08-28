import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Rol } from '../roles/entities/rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async crear(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const rol = await this.rolRepository.findOneBy({ id: createUsuarioDto.rolId });

    if (!rol) {
      throw new NotFoundException(`El rol con ID ${createUsuarioDto.rolId} no existe`);
    }

    const nuevoUsuario = this.usuarioRepository.create({
      nombre: createUsuarioDto.nombre,
      correo: createUsuarioDto.correo,
      rol: rol,
    });

    return this.usuarioRepository.save(nuevoUsuario);
  }

obtenerTodos(): Promise<Usuario[]> {
  return this.usuarioRepository.find({ relations: { rol: true } });
}
}