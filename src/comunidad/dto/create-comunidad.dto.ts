import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateComunidadDto {
  @ApiProperty({ example: 'Comunidad Maya', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiPropertyOptional({ example: 'Descripción de la comunidad' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({
    enum: ['ACTIVA', 'INACTIVA'],
    example: 'ACTIVA',
  })
  @IsOptional()
  @IsEnum(['ACTIVA', 'INACTIVA'])
  estado?: 'ACTIVA' | 'INACTIVA';

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  id_lengua: number;
}