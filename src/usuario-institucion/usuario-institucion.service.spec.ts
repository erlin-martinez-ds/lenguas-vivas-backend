import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioInstitucionService } from './usuario-institucion.service';
import { UsuarioInstitucion } from './entities/usuario-institucion.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Institucion } from '../institucion/entities/institucion.entity';

describe('UsuarioInstitucionService', () => {
  let service: UsuarioInstitucionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioInstitucionService,
        { provide: getRepositoryToken(UsuarioInstitucion), useValue: {} },
        { provide: getRepositoryToken(Usuario), useValue: {} },
        { provide: getRepositoryToken(Institucion), useValue: {} },
      ],
    }).compile();

    service = module.get<UsuarioInstitucionService>(UsuarioInstitucionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});