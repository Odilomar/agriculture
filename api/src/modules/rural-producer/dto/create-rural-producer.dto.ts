import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRuralProducerDto {
  @ApiPropertyOptional()
  cpf?: string;

  @ApiPropertyOptional()
  cnpj?: string;

  @ApiProperty()
  producer_name: string;

  @ApiProperty()
  farm_name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  total_farm_area: number;

  @ApiProperty()
  arable_farm_area: number;

  @ApiProperty()
  vegetation_farm_area: number;

  @ApiProperty({
    isArray: true,
    type: Number,
  })
  plantedCropsIds: number[];
}
