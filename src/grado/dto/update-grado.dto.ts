
import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGradoDto {
  @ApiPropertyOptional({ example: 'Segundo', maxLength: 20 })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  nombre?: string;
}
