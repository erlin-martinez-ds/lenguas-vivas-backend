import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ComunidadModule } from './comunidad/comunidad.module';
import { LenguaModule } from './lengua/lengua.module';
import { InstitucionModule } from './institucion/institucion.module';
import { GradoModule } from './grado/grado.module';
import { UsuarioInstitucionModule } from './usuario-institucion/usuario-institucion.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'lenguas_vivas_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    RolesModule,
    UsuarioModule,
    ComunidadModule,
    LenguaModule,
    InstitucionModule,
    GradoModule,
    UsuarioInstitucionModule,
    AuthModule,
  ],
})
export class AppModule {}
