import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { Grado } from '../grado/entities/grado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Grado])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}