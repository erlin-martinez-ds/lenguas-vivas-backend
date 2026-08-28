import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LenguaService } from './lengua.service';
import { LenguaController } from './lengua.controller';
import { Lengua } from './entities/lengua.entity';
import { Comunidad } from '../comunidad/entities/comunidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lengua, Comunidad])],
  controllers: [LenguaController],
  providers: [LenguaService],
  exports: [LenguaService],
})
export class LenguaModule {}