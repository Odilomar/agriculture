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
  @ApiPropertyOptional({
    example: '89156834713',
  })
  @Transform(transformToStringCpf)
  cpf?: string;

  @IsString()
  @IsCustomCNPJ()
  @IsOptional()
  @ApiPropertyOptional({
    example: '58913619000177',
  })
  @Transform(transformToStringCnpj)
  cnpj?: string;

  @IsString()
  @ApiProperty({
    example: 'deserunt voluptatem esse',
  })
  producer_name: string;

  @IsString()
  @ApiProperty({
    example: 'sint totam id',
  })
  farm_name: string;

  @IsString()
  @ApiProperty({
    example: 'recusandae rerum voluptas',
  })
  city: string;

  @IsString()
  @ApiProperty({
    example: 'qui',
  })
  state: string;

  @IsNumberString()
  @ApiProperty({
    example: 84,
  })
  @Transform(transformToDoubleNumber)
  total_farm_area: number;

  @IsNumberString()
  @ApiProperty({
    example: 39,
  })
  @Transform(transformToDoubleNumber)
  arable_farm_area: number;

  @IsNumberString()
  @ApiProperty({
    example: 44,
  })
  @Transform(transformToDoubleNumber)
  vegetation_farm_area: number;

  @IsNumber({}, { each: true })
  @IsArray()
  @ApiProperty({
    isArray: true,
    type: Number,
    example: [1, 2],
  })
  @Transform(transformToNumberArray)
  plantedCropsIds: number[];
}
