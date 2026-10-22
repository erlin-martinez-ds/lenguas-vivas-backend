import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { EstadoNivel } from '../entities/nivel.entity';

export class CreateNivelDto {
  @IsInt()
  @Min(1)
  @Max(255)
  idNivel: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nombre: string;

  @IsInt()
  @Min(1)
  @Max(255)
  orden: number;

  @IsOptional()
  @IsEnum(EstadoNivel)
  estado?: EstadoNivel;
}