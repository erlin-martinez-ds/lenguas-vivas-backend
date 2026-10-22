import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolDto {
  @ApiProperty({ example: 'ADMINISTRADOR', maxLength: 50 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nombre: string;
}
