import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Rol } from './entities/rol.entity';

describe('RolesService (unitaria)', () => {
  let service: RolesService;
  const mockRepo = { findOne: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        { provide: getRepositoryToken(Rol), useValue: mockRepo },
      ],
    }).compile();
    service = module.get<RolesService>(RolesService);
  });

  // PRUEBA UNITARIA 1 - Capa Service
  it('findOne: lanza NotFoundException si el rol no existe', async () => {
    mockRepo.findOne.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
  });
});