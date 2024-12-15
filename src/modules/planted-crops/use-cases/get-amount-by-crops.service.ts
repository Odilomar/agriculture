import { Injectable } from '@nestjs/common';
import { PlantedCropsRepository } from '../infra';

@Injectable()
export class GetAmountByCropsService {
  constructor(
    private readonly plantedCropsRepository: PlantedCropsRepository,
  ) {}

  async execute() {
    return this.plantedCropsRepository.totalUsedCropsAmount();
  }
}
