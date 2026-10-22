
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { EstadoEvaluacion } from '../entities/evaluacion.entity';

export class CreateEvaluacionDto {
  @IsInt()
  @Min(1)
  idLengua: number;

  @IsInt()
  @Min(1)
  idNivel: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre: string;

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
