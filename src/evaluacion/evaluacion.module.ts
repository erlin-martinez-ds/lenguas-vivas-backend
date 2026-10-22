
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Evaluacion } from './entities/evaluacion.entity';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionService } from './evaluacion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evaluacion]),
  ],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
  exports: [EvaluacionService],
})
export class EvaluacionModule {}
