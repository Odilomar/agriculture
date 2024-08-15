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

  private async customValidations(
    body: Omit<CreateRuralProducerDto, 'plantedCropsIds'>,
  ) {
    if (body.cpf && body.cnpj) {
      throw new BadRequestException(
        'It should only exists a CPF or a CNPJ. Not both!',
      );
    }

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
  }

  async execute({ plantedCropsIds, ...body }: CreateRuralProducerDto) {
    await this.customValidations(body);

    const [ruralProducer] = await this.ruralProducerRepository.save([body]);

    await this.ruralProducerPlantedCropsRepository.save(
      plantedCropsIds.map((id_planted_crops) => ({
        id_rural_producer: ruralProducer.id,
        id_planted_crops,
      })),
    );
  }
}
