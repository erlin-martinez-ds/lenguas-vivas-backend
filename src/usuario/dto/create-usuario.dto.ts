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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Ana', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @ApiProperty({ example: 'López', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  apellido!: string;

  @ApiPropertyOptional({
    example: 'ana.lopez@lenguasvivas.edu',
    maxLength: 150,
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  correo?: string;

  @ApiPropertyOptional({ example: 'ContraseñaSegura123', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  password?: string;

  @ApiPropertyOptional({ example: 'EST-001', maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  codigo_estudiante?: string;

  @ApiPropertyOptional({ example: 'hash-del-pin', maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  pin_hash?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  id_comunidad?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  id_grado?: number;

  @ApiPropertyOptional({
    enum: ['ACTIVO', 'INACTIVO'],
    example: 'ACTIVO',
  })
  @IsOptional()
  @IsEnum(['ACTIVO', 'INACTIVO'])
  estado?: 'ACTIVO' | 'INACTIVO';

  @ApiProperty({ example: 1, description: 'ID del rol del usuario' })
  @IsInt()
  @IsPositive()
  rolId: number;
}