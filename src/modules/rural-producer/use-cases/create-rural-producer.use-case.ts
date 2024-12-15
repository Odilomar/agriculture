import { BadRequestException, Injectable } from '@nestjs/common';
import {
  RuralProducerPlantedCropsRepository,
  RuralProducerRepository,
} from '../infra';
import { CreateRuralProducerDto } from '../dto';
import { RURAL_PRODUCER_WITH_SAME_CNPJ_OR_CPF_ALREADY_EXISTS } from '../../../shared';
import * as helpers from '../utils/helpers';

@Injectable()
export class CreateRuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
    private readonly ruralProducerPlantedCropsRepository: RuralProducerPlantedCropsRepository,
  ) {}

  private async customValidations({
    cpf,
    cnpj,
    total_farm_area,
    arable_farm_area,
    vegetation_farm_area,
  }: Omit<CreateRuralProducerDto, 'plantedCropsIds'>): Promise<void> {
    helpers.shouldNotExistsCpfAndCnpj({ cpf, cnpj });
    helpers.validateTotalFarmArea({
      total_farm_area,
      arable_farm_area,
      vegetation_farm_area,
    });

    const cpfOrCnpj = cpf || cnpj;

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

    if (foundRuralProducer) {
      throw new BadRequestException(
        RURAL_PRODUCER_WITH_SAME_CNPJ_OR_CPF_ALREADY_EXISTS,
      );
    }
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
