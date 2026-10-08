import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  apellido!: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  correo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  password?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigo_estudiante?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  pin_hash?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  id_comunidad?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  id_grado?: number;

  @IsOptional()
  @IsEnum(['ACTIVO', 'INACTIVO'])
  estado?: 'ACTIVO' | 'INACTIVO';

  @IsInt()
  @IsPositive()
  rolId: number;
}