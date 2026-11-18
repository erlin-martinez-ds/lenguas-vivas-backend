jest.mock('@nestjs/jwt', () => ({
  JwtService: class {},
  JwtModule: {},
}));
jest.mock('bcrypt', () => ({ compare: jest.fn() }));

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { Usuario } from '../usuario/entities/usuario.entity';

describe('AuthService (unitaria)', () => {
  let service: AuthService;
  const mockUsuarioRepo = { findOne: jest.fn() };
  const mockJwtService = { signAsync: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(Usuario), useValue: mockUsuarioRepo },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  // PRUEBA UNITARIA 2 - Capa Service (lógica de autenticación)
  it('login: con credenciales válidas devuelve access_token y datos del usuario', async () => {
    mockUsuarioRepo.findOne.mockResolvedValue({
      id: 1,
      nombre: 'Milton',
      apellido: 'Pillimue',
      correo: 'milton@test.com',
      password_hash: 'hash-en-bd',
      estado: 'ACTIVO',
      rol: { nombre: 'ADMINISTRADOR' },
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    mockJwtService.signAsync.mockResolvedValue('token-falso');

    const resultado = await service.login('milton@test.com', '123456');

    expect(mockJwtService.signAsync).toHaveBeenCalledWith({
      sub: 1,
      correo: 'milton@test.com',
      rol: 'ADMINISTRADOR',
    });
    expect(resultado.access_token).toBe('token-falso');
    expect(resultado.usuario.rol).toBe('ADMINISTRADOR');
  });
});