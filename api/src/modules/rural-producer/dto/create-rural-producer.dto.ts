export class CreateRuralProducerDto {
  cpf?: string;
  cnpj?: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  total_farm_area: number;
  arable_farm_area: number;
  vegetation_farm_area: number;
  plantedCropsIds: number[];
}
