import { Injectable } from '@nestjs/common';
import { RuralProducerRepository } from '../infra';
import { GetAmountByCropsService } from '../../planted-crops/use-cases';
import { GetDashboardIntelResponseDto } from '../dto';

@Injectable()
export class GetDashboardIntelService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
    private readonly getAmountByCropsService: GetAmountByCropsService,
  ) {}

  async execute(): Promise<GetDashboardIntelResponseDto> {
    const [
      totalFarmArea,
      totalFarms,
      totalFarmsByStates,
      totalUsedFarmArea,
      totalUsedCropsAmount,
    ] = await Promise.all([
      this.ruralProducerRepository.totalFarmAreaAmount(),
      this.ruralProducerRepository.totalFarmAmount(),
      this.ruralProducerRepository.totalFarmsByStates(),
      this.ruralProducerRepository.totalUsedFarmArea(),
      this.getAmountByCropsService.execute(),
    ]);

    return {
      totalFarmArea,
      totalUsedFarmArea,
      totalFarms,
      totalFarmsByStates,
      totalUsedCropsAmount,
    };
  }
}
