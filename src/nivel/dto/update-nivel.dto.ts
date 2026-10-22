import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { EstadoNivel } from '../entities/nivel.entity';

export class UpdateNivelDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nombre?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(255)
  orden?: number;

  @IsOptional()
  @IsEnum(EstadoNivel)
  estado?: EstadoNivel;
}