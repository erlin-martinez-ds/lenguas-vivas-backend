import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioInstitucionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id_usuario: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  id_institucion: number;

  @ApiProperty({ enum: ['ACTIVO', 'INACTIVO'], example: 'ACTIVO' })
  @IsEnum(['ACTIVO', 'INACTIVO'])
  estado: 'ACTIVO' | 'INACTIVO';
}