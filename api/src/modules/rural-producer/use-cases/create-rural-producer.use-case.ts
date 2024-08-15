import { BadRequestException, Injectable } from '@nestjs/common';
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
    const cpfOrCnpj = body.cpf || body.cnpj;

    const foundRuralProducer = await this.ruralProducerRepository.findOne({
      where: [
        {
          cpf: cpfOrCnpj,
        },
        {
          cnpj: cpfOrCnpj,
        },
      ],
      select: ['id'],
    });

    if (foundRuralProducer)
      throw new BadRequestException(
        `There's already a rural producer with same CPF/CNPJ created!`,
      );

    const [ruralProducer] = await this.ruralProducerRepository.save([body]);

    await this.ruralProducerPlantedCropsRepository.save(
      plantedCropsIds.map((id_planted_crops) => ({
        id_rural_producer: ruralProducer.id,
        id_planted_crops,
      })),
    );
  }
}
