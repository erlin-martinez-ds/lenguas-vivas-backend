import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioInstitucion } from './entities/usuario-institucion.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Institucion } from '../institucion/entities/institucion.entity';
import { UsuarioInstitucionService } from './usuario-institucion.service';
import { UsuarioInstitucionController } from './usuario-institucion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioInstitucion,
      Usuario,
      Institucion,
    ]),
  ],
  providers: [UsuarioInstitucionService],
  controllers: [UsuarioInstitucionController],
})
export class UsuarioInstitucionModule {}