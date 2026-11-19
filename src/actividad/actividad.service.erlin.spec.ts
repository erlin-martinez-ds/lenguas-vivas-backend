import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ActividadService } from './actividad.service';
import { Actividad } from './entities/actividad.entity';

describe('ActividadService (unitaria) - Erlin', () => {
  let service: ActividadService;

  const mockRepository = {
    findOne: jest.fn(),
  };

  const mockDataSource = {
    getRepository: jest.fn().mockReturnValue(mockRepository),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
  });

  it('obtenerPorId: devuelve la actividad cuando existe', async () => {
    const actividad = {
      idActividad: 1,
      titulo: 'Actividad de prueba',
    } as Actividad;

    mockRepository.findOne.mockResolvedValue(actividad);

    const resultado = await service.obtenerPorId(1);

    expect(resultado).toEqual(actividad);
    expect(mockRepository.findOne).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { idActividad: 1 },
      }),
    );
  });

  it('obtenerPorId: lanza NotFoundException cuando no existe', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.obtenerPorId(99)).rejects.toThrow(NotFoundException);

    expect(mockRepository.findOne).toHaveBeenCalled();
  });
});
