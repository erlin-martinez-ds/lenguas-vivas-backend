import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstitucionService } from './institucion.service';
import { Institucion } from './entities/institucion.entity';

describe('InstitucionService', () => {
  let service: InstitucionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitucionService,
        { provide: getRepositoryToken(Institucion), useValue: {} },
      ],
    }).compile();

    service = module.get<InstitucionService>(InstitucionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});