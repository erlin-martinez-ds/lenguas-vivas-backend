import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CursosController } from './cursos.controller';
import { CursosService } from './cursos.service';
import { Curso } from './entities/curso.entity';
import { Lengua } from '../lengua/entities/lengua.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Curso, Lengua]),
  ],
  controllers: [CursosController],
  providers: [CursosService],
  exports: [CursosService],
})
export class CursosModule {}