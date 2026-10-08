import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUsuarioInstitucionDto {
  @IsNotEmpty()
  @IsInt()
  id_usuario: number;

  @IsNotEmpty()
  @IsInt()
  id_institucion: number;

  @IsEnum(['ACTIVO', 'INACTIVO'])
  estado: 'ACTIVO' | 'INACTIVO';
}