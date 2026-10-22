
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { EstadoEvaluacion } from '../entities/evaluacion.entity';

export class UpdateEvaluacionDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  idLengua?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  idNivel?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  nombre?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  porcentajeAprobacion?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(255)
  maxIntentos?: number;

  @IsOptional()
  @IsEnum(EstadoEvaluacion)
  estado?: EstadoEvaluacion;
}
