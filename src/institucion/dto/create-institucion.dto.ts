import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateInstitucionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  direccion: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  municipio: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  departamento: string;

  @IsOptional()
  @IsEnum(['ACTIVA', 'INACTIVA'])
  estado?: 'ACTIVA' | 'INACTIVA';
}