import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioInstitucionController } from './usuario-institucion.controller';

describe('UsuarioInstitucionController', () => {
  let controller: UsuarioInstitucionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioInstitucionController],
    }).compile();

    controller = module.get<UsuarioInstitucionController>(UsuarioInstitucionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
