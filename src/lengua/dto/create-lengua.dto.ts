import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLenguaDto {
  @ApiProperty({ example: 'K’iche’', maxLength: 150 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  nombre: string;

  @ApiPropertyOptional({ example: 'Lengua maya hablada en Guatemala' })
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
}