import { PartialType } from '@nestjs/mapped-types';
import { CreateLenguaDto } from './create-lengua.dto';

export class UpdateLenguaDto extends PartialType(CreateLenguaDto) {}
