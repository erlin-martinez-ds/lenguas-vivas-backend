import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Grado } from './entities/grado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grado]),
  ],
})
export class GradoModule {}