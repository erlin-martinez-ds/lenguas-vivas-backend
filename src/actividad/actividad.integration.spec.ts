jest.mock('@nestjs/passport', () => {
  class MockJwtAuthGuard {}

  return {
    AuthGuard: () => MockJwtAuthGuard,
    PassportStrategy: () => class {},
  };
});

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import request from 'supertest';

import { ActividadController } from './actividad.controller';
import { ActividadService } from './actividad.service';
import { Actividad } from './entities/actividad.entity';
import { RolesGuard } from '../auth/guards/roles.guard';

describe('Actividades (integración Controller + Service)', () => {
  let app: INestApplication;

  const actividadesEnMemoria = [
    {
      idActividad: 1,
      titulo: 'Actividad de prueba',
      descripcion: 'Descripción de integración',
    },
  ];

  const repoEnMemoria = {
    findOne: jest.fn(({ where: { idActividad } }) =>
      Promise.resolve(
        actividadesEnMemoria.find(
          (actividad) => actividad.idActividad === idActividad,
        ) ?? null,
      ),
    ),
  };

  const dataSourceEnMemoria = {
    getRepository: jest.fn().mockReturnValue(repoEnMemoria),
  };

  const jwtGuardDePrueba = {
    canActivate: (context: any) => {
      const req = context.switchToHttp().getRequest();
      req.user = { id: 5, rol: 'DOCENTE' };
      return true;
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ActividadController],
      providers: [
        ActividadService,
        RolesGuard,
        {
          provide: DataSource,
          useValue: dataSourceEnMemoria,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(jwtGuardDePrueba)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /actividades/1 responde 200 y devuelve la actividad', async () => {
    const res = await request(app.getHttpServer())
      .get('/actividades/1')
      .expect(200);

    expect(res.body.idActividad).toBe(1);
    expect(res.body.titulo).toBe('Actividad de prueba');
  });

  it('GET /actividades/99 responde 404 cuando la actividad no existe', async () => {
    await request(app.getHttpServer()).get('/actividades/99').expect(404);
  });
});
