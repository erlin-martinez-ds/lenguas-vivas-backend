import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  correo: string;

  @IsInt()
  @IsPositive()
  rolId: number;
}