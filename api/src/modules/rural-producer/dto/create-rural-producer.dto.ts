import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  IsCustomCNPJ,
  IsCustomCPF,
  transformToDoubleNumber,
  transformToNumberArray,
  transformToStringCnpj,
  transformToStringCpf,
} from '../../../shared';

export class CreateRuralProducerDto {
  @IsString()
  @IsCustomCPF()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(transformToStringCpf)
  cpf?: string;

  @IsString()
  @IsCustomCNPJ()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(transformToStringCnpj)
  cnpj?: string;

  @IsString()
  @ApiProperty()
  producer_name: string;

  @IsString()
  @ApiProperty()
  farm_name: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsNumberString()
  @ApiProperty()
  @Transform(transformToDoubleNumber)
  total_farm_area: number;

  @IsNumberString()
  @ApiProperty()
  @Transform(transformToDoubleNumber)
  arable_farm_area: number;

  @IsNumberString()
  @ApiProperty()
  @Transform(transformToDoubleNumber)
  vegetation_farm_area: number;

  @IsNumber({}, { each: true })
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: Number,
  })
  @Transform(transformToNumberArray)
  plantedCropsIds: number[];
}
