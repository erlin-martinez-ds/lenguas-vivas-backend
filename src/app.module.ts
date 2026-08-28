import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { databaseConfig } from './config/database.config';
import { ComunidadModule } from './comunidad/comunidad.module';
import { LenguaModule } from './lengua/lengua.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),

    RolesModule,

    ComunidadModule,

    LenguaModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}