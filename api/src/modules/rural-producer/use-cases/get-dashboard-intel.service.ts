import { Injectable } from '@nestjs/common';
import { RuralProducerRepository } from '../infra';

@Injectable()
export class GetDashboardIntelService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute() {
    const [totalFarmArea, totalFarms, totalFarmsByStates, totalUsedFarmArea] =
      await Promise.all([
        this.ruralProducerRepository.totalFarmAreaAmount(),
        this.ruralProducerRepository.totalFarmAmount(),
        this.ruralProducerRepository.totalFarmsByStates(),
        this.ruralProducerRepository.totalUsedFarmArea(),
      ]);

    return {
      totalFarmArea,
      totalUsedFarmArea,
      totalFarms,
      totalFarmsByStates,
    };
  }
}
