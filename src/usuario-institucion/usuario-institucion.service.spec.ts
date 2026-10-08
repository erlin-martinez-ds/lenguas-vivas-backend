import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioInstitucionService } from './usuario-institucion.service';

describe('UsuarioInstitucionService', () => {
  let service: UsuarioInstitucionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioInstitucionService],
    }).compile();

    service = module.get<UsuarioInstitucionService>(UsuarioInstitucionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
