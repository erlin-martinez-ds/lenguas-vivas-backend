import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInstitucionDto {
  @ApiProperty({ example: 'Escuela Rural', maxLength: 150 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  nombre: string;

  @ApiProperty({ example: 'Aldea Centro, zona 1', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  direccion: string;

  @ApiProperty({ example: 'Chichicastenango', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  municipio: string;

  @ApiProperty({ example: 'Quiché', maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  departamento: string;

  @ApiPropertyOptional({
    enum: ['ACTIVA', 'INACTIVA'],
    example: 'ACTIVA',
  })
  @IsOptional()
  @IsEnum(['ACTIVA', 'INACTIVA'])
  estado?: 'ACTIVA' | 'INACTIVA';
}