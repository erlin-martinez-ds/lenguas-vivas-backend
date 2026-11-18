jest.mock('@nestjs/passport', () => ({
  AuthGuard: () => class {},
  PassportStrategy: () => class {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioInstitucionController } from './usuario-institucion.controller';
import { UsuarioInstitucionService } from './usuario-institucion.service';

describe('UsuarioInstitucionController', () => {
  let controller: UsuarioInstitucionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioInstitucionController],
      providers: [{ provide: UsuarioInstitucionService, useValue: {} }],
    }).compile();

    controller = module.get<UsuarioInstitucionController>(
      UsuarioInstitucionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});