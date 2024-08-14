import { Injectable } from '@nestjs/common';
import {
  RuralProducerPlantedCropsRepository,
  RuralProducerRepository,
} from '../infra';
import { CreateRuralProducerDto } from '../dto';

@Injectable()
export class CreateRuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
    private readonly ruralProducerPlantedCropsRepository: RuralProducerPlantedCropsRepository,
  ) {}

  async execute({ plantedCropsIds, ...body }: CreateRuralProducerDto) {
    const [ruralProducer] = await this.ruralProducerRepository.save([body]);

    await this.ruralProducerPlantedCropsRepository.save(
      plantedCropsIds.map((id_planted_crops) => ({
        id_rural_producer: ruralProducer.id,
        id_planted_crops,
      })),
    );
  }
}
