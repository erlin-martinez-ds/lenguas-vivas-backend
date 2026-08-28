import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComunidadService } from './comunidad.service';
import { ComunidadController } from './comunidad.controller';
import { Comunidad } from './entities/comunidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comunidad])],
  controllers: [ComunidadController],
  providers: [ComunidadService],
  exports: [ComunidadService, TypeOrmModule],
})
export class ComunidadModule {}