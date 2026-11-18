import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard (unitaria)', () => {
  const reflector = { getAllAndOverride: jest.fn() } as unknown as Reflector;
  const guard = new RolesGuard(reflector);

  const crearContexto = (usuario: any): ExecutionContext =>
    ({
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: usuario }),
      }),
    }) as unknown as ExecutionContext;

  // PRUEBA UNITARIA 3 - Capa Guard (autorización por rol)
  it('canActivate: lanza ForbiddenException si el rol del usuario no está permitido', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['ADMINISTRADOR']);

    expect(() => guard.canActivate(crearContexto({ rol: 'ESTUDIANTE' }))).toThrow(
      ForbiddenException,
    );
  });
});