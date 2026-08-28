import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLenguaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  comunidadId: number;
}