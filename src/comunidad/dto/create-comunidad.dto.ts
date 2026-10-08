import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateComunidadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(['ACTIVA', 'INACTIVA'])
  estado?: 'ACTIVA' | 'INACTIVA';

  @IsInt()
  @IsNotEmpty()
  id_lengua: number;
}