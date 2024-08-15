import { BadRequestException, Injectable } from '@nestjs/common';
import {
  RuralProducerPlantedCropsRepository,
  RuralProducerRepository,
} from '../infra';
import { CreateRuralProducerDto } from '../dto';
import {
  ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
  CPF_AND_CNPJ_ERROR,
  RURAL_PRODUCER_WITH_SAME_CNPJ_OR_CPF_ALREADY_EXISTS,
} from '../../../shared';

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
  }: Omit<CreateRuralProducerDto, 'plantedCropsIds'>) {
    if (cpf && cnpj) {
      throw new BadRequestException(CPF_AND_CNPJ_ERROR);
    }

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

    if (arable_farm_area + vegetation_farm_area > total_farm_area) {
      throw new BadRequestException(
        ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
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
