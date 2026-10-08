import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(correo: string, password: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
      relations: {
        rol: true,
      },
    });

    if (!usuario || !usuario.password_hash) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash,
    );

    if (!passwordValida) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    if (usuario.estado !== 'ACTIVO') {
      throw new UnauthorizedException(
        'El usuario está inactivo',
      );
    }

    return usuario;
  }

  async login(correo: string, password: string) {
    const usuario = await this.validarUsuario(correo, password);

    const payload = {
      sub: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol.nombre,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol.nombre,
      },
    };
  }
}