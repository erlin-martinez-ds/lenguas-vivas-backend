
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Actividad } from './entities/actividad.entity';
import { ActividadLengua } from './entities/actividad-lengua.entity';
import { ActividadTema } from './entities/actividad-tema.entity';
import { ActividadController } from './actividad.controller';
import { ActividadService } from './actividad.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Actividad,
      ActividadLengua,
      ActividadTema,
    ]),
  ],
  controllers: [ActividadController],
  providers: [ActividadService],
  exports: [ActividadService],
})
export class ActividadModule {}
