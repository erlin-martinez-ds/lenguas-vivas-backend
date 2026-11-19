import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstitucionService } from './institucion.service';
import { Institucion } from './entities/institucion.entity';

describe('InstitucionService (unitaria) - Erlin', () => {
  let service: InstitucionService;

  const mockInstitucionRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstitucionService,
        {
          provide: getRepositoryToken(Institucion),
          useValue: mockInstitucionRepository,
        },
      ],
    }).compile();

    service = module.get<InstitucionService>(InstitucionService);
  });

  it('obtenerUna: devuelve la institución cuando existe', async () => {
    const institucion = {
      id: 1,
      nombre: 'Institución de prueba',
    } as Institucion;

    mockInstitucionRepository.findOne.mockResolvedValue(institucion);

    const resultado = await service.obtenerUna(1);

    expect(resultado).toEqual(institucion);
    expect(mockInstitucionRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('obtenerUna: lanza NotFoundException cuando no existe', async () => {
    mockInstitucionRepository.findOne.mockResolvedValue(null);

    await expect(service.obtenerUna(99)).rejects.toThrow(NotFoundException);

    expect(mockInstitucionRepository.findOne).toHaveBeenCalledWith({
      where: { id: 99 },
    });
  });
});
