jest.mock('@nestjs/passport', () => ({
  AuthGuard: () => class {},
  PassportStrategy: () => class {},
}));

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Rol } from './entities/rol.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('Roles (integración Controller + Service + RolesGuard)', () => {
  let app: INestApplication;

  // Repositorio en memoria que hace de "base de datos de pruebas"
  const rolesEnMemoria = [{ id: 1, nombre: 'ADMINISTRADOR' }];
  const repoEnMemoria = {
    findOne: jest.fn(({ where: { id } }) =>
      Promise.resolve(rolesEnMemoria.find((r) => r.id === id) ?? null),
    ),
  };

  // Sustituye solo la validación JWT: toma el rol desde un header de prueba
  const jwtGuardDePrueba = {
    canActivate: (ctx: any) => {
      const req = ctx.switchToHttp().getRequest();
      req.user = { rol: req.headers['x-test-rol'] };
      return true;
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        { provide: getRepositoryToken(Rol), useValue: repoEnMemoria },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtGuardDePrueba)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // PRUEBA DE INTEGRACIÓN
  it('GET /roles/1 con rol ADMINISTRADOR responde 200 y el rol', async () => {
    const res = await request(app.getHttpServer())
      .get('/roles/1')
      .set('x-test-rol', 'ADMINISTRADOR')
      .expect(200);

    expect(res.body).toEqual({ id: 1, nombre: 'ADMINISTRADOR' });
  });

  it('GET /roles/99 responde 404 cuando el rol no existe', async () => {
    await request(app.getHttpServer())
      .get('/roles/99')
      .set('x-test-rol', 'ADMINISTRADOR')
      .expect(404);
  });

  it('GET /roles/1 con rol ESTUDIANTE responde 403', async () => {
    await request(app.getHttpServer())
      .get('/roles/1')
      .set('x-test-rol', 'ESTUDIANTE')
      .expect(403);
  });
});