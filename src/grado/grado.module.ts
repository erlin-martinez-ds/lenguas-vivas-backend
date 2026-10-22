
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Grado } from './entities/grado.entity';
import { GradoController } from './grado.controller';
import { GradoService } from './grado.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grado]),
  ],
  controllers: [GradoController],
  providers: [GradoService],
})
export class GradoModule {}
