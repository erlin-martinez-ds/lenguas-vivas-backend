import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LenguaService } from './lengua.service';
import { LenguaController } from './lengua.controller';
import { Lengua } from './entities/lengua.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lengua])],
  controllers: [LenguaController],
  providers: [LenguaService],
})
export class LenguaModule {}
