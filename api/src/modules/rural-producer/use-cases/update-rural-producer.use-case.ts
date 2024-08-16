import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  RuralProducerEntity,
  RuralProducerPlantedCropsRepository,
  RuralProducerRepository,
} from '../infra';
import { UpdateRuralProducerDto } from '../dto';
import {
  RURAL_PRODUCER_NOT_FOUND,
  RURAL_PRODUCER_WITH_SAME_CNPJ_OR_CPF_ALREADY_EXISTS,
} from '../../../shared';
import * as helpers from '../utils/helpers';

@Injectable()
export class UpdateRuralProducerService {
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
    id,
  }: RuralProducerEntity): Promise<void> {
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
          id,
        },
        {
          cnpj: cpfOrCnpj,
          id,
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

  async execute({ plantedCropsIds, id, ...body }: UpdateRuralProducerDto) {
    const found = await this.ruralProducerRepository.findOne({
      where: { id },
    });

    if (!found) {
      throw new NotFoundException(RURAL_PRODUCER_NOT_FOUND);
    }

    const updated = {
      ...found,
      ...body,
    };

    await this.customValidations(updated);

    await this.ruralProducerRepository.save([updated]);

    await this.ruralProducerPlantedCropsRepository.deleteByRuralProducerId(id);
    await this.ruralProducerPlantedCropsRepository.save(
      plantedCropsIds.map((id_planted_crops) => ({
        id_rural_producer: id,
        id_planted_crops,
      })),
    );
  }
}
