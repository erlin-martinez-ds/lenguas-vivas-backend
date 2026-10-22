
import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGradoDto {
  @ApiProperty({ example: 'Primero', maxLength: 20 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  nombre: string;
}
