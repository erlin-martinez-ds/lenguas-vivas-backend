import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Nivel } from './entities/nivel.entity';
import { NivelController } from './nivel.controller';
import { NivelService } from './nivel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nivel])],
  controllers: [NivelController],
  providers: [NivelService],
  exports: [NivelService],
})
export class NivelModule {}