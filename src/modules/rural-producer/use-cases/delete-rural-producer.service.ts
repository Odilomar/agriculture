import { Injectable, NotFoundException } from '@nestjs/common';
import { RuralProducerRepository } from '../infra';
import { RURAL_PRODUCER_NOT_FOUND } from '../../../shared';

@Injectable()
export class DeleteRuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const found = await this.ruralProducerRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(RURAL_PRODUCER_NOT_FOUND);
    }

    await this.ruralProducerRepository.delete(id);
  }
}
