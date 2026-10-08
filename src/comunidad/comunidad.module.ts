import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunidadService } from './comunidad.service';
import { ComunidadController } from './comunidad.controller';
import { Comunidad } from './entities/comunidad.entity';
import { Lengua } from '../lengua/entities/lengua.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comunidad, Lengua])],
  controllers: [ComunidadController],
  providers: [ComunidadService],
  exports: [ComunidadService, TypeOrmModule],
})
export class ComunidadModule {}