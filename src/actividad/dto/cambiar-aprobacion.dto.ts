
import { IsEnum } from 'class-validator';
import { EstadoAprobacionActividad } from '../entities/actividad.entity';

export class CambiarAprobacionDto {
  @IsEnum(EstadoAprobacionActividad)
  estadoAprobacion: EstadoAprobacionActividad;
}
