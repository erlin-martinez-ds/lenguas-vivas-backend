jest.mock('@nestjs/passport', () => ({
  AuthGuard: () => class {},
  PassportStrategy: () => class {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { InstitucionController } from './institucion.controller';
import { InstitucionService } from './institucion.service';

describe('InstitucionController', () => {
  let controller: InstitucionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitucionController],
      providers: [{ provide: InstitucionService, useValue: {} }],
    }).compile();

    controller = module.get<InstitucionController>(InstitucionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});