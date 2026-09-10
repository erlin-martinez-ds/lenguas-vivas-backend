import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  IsPositive,
} from 'class-validator';

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

  @IsInt()
  @IsPositive()
  lenguaId: number;
}