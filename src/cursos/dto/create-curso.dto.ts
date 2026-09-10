import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  creditos?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}