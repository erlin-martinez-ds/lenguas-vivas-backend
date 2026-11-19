jest.mock('@nestjs/passport', () => ({
  AuthGuard: () => class {},
  PassportStrategy: () => class {},
}));

import { Test, TestingModule } from '@nestjs/testing';
import { ActividadController } from './actividad.controller';
import { ActividadService } from './actividad.service';

describe('ActividadController (unitaria) - Erlin', () => {
  let controller: ActividadController;

  const mockActividadService = {
    crear: jest.fn(),
    listar: jest.fn(),
    obtenerPorId: jest.fn(),
    actualizar: jest.fn(),
    cambiarAprobacion: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActividadController],
      providers: [
        {
          provide: ActividadService,
          useValue: mockActividadService,
        },
      ],
    }).compile();

    controller = module.get<ActividadController>(ActividadController);
  });

  it('obtenerPorId: solicita al servicio la actividad indicada', async () => {
    const actividad = {
      idActividad: 1,
      titulo: 'Actividad de prueba',
    };

    mockActividadService.obtenerPorId.mockResolvedValue(actividad);

    const resultado = await controller.obtenerPorId(1);

    expect(resultado).toEqual(actividad);
    expect(mockActividadService.obtenerPorId).toHaveBeenCalledWith(1);
  });

  it('crear: envía los datos y el identificador del usuario al servicio', async () => {
    const dto = {
      titulo: 'Actividad nueva',
      descripcion: 'Descripción de prueba',
    } as any;

    const req = {
      user: {
        id: 5,
      },
    };

    const actividadCreada = {
      idActividad: 10,
      titulo: 'Actividad nueva',
    };

    mockActividadService.crear.mockResolvedValue(actividadCreada);

    const resultado = await controller.crear(dto, req);

    expect(resultado).toEqual(actividadCreada);
    expect(mockActividadService.crear).toHaveBeenCalledWith(dto, 5);
  });
});
