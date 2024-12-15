import { Test, TestingModule } from '@nestjs/testing';
import {
  RuralProducerRepository,
  RuralProducerPlantedCropsRepository,
} from '../infra';
import { CreateRuralProducerDto } from '../dto';
import {
  ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
  CPF_AND_CNPJ_ERROR,
  RURAL_PRODUCER_WITH_SAME_CNPJ_OR_CPF_ALREADY_EXISTS,
} from '../../../shared';
import * as dochelper from 'dochelper';
import { faker } from '@faker-js/faker';
import { CreateRuralProducerService } from './create-rural-producer.use-case';
import { BadRequestException } from '@nestjs/common';

describe('CreateRuralProducerService', () => {
  let service: CreateRuralProducerService;
  let ruralProducerRepository: RuralProducerRepository;
  let ruralProducerPlantedCropsRepository: RuralProducerPlantedCropsRepository;

  const params: CreateRuralProducerDto = {
    arable_farm_area: 50,
    vegetation_farm_area: 30,
    total_farm_area: 200,
    city: faker.string.sample(),
    state: faker.string.sample(),
    farm_name: faker.company.name(),
    producer_name: faker.person.fullName(),
    plantedCropsIds: [1, 2],
  };

  const SAVED_RURAL_PRODUCER_ID_MOCK = faker.number.int();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RuralProducerRepository,
          useValue: {
            findOne: jest.fn(),
            save: jest
              .fn()
              .mockResolvedValue([{ id: SAVED_RURAL_PRODUCER_ID_MOCK }]),
          },
        },
        {
          provide: RuralProducerPlantedCropsRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        CreateRuralProducerService,
      ],
    }).compile();

    service = module.get<CreateRuralProducerService>(
      CreateRuralProducerService,
    );
    ruralProducerRepository = module.get<RuralProducerRepository>(
      RuralProducerRepository,
    );
    ruralProducerPlantedCropsRepository =
      module.get<RuralProducerPlantedCropsRepository>(
        RuralProducerPlantedCropsRepository,
      );
  });

  it('should successfully create a rural producer with cpf', async () => {
    const input: CreateRuralProducerDto = {
      ...params,
      cpf: dochelper.CPF.generate(),
    };

    await service.execute(input);

    delete input.plantedCropsIds;

    expect(ruralProducerRepository.save).toHaveBeenCalledWith([input]);
    expect(ruralProducerPlantedCropsRepository.save).toHaveBeenCalledWith([
      { id_rural_producer: SAVED_RURAL_PRODUCER_ID_MOCK, id_planted_crops: 1 },
      { id_rural_producer: SAVED_RURAL_PRODUCER_ID_MOCK, id_planted_crops: 2 },
    ]);
  });

  it('should successfully create a rural producer with cnpj', async () => {
    const input: CreateRuralProducerDto = {
      ...params,
      cnpj: dochelper.CNPJ.generate(),
    };

    await service.execute(input);

    delete input.plantedCropsIds;

    expect(ruralProducerRepository.save).toHaveBeenCalledWith([input]);
    expect(ruralProducerPlantedCropsRepository.save).toHaveBeenCalledWith([
      { id_rural_producer: SAVED_RURAL_PRODUCER_ID_MOCK, id_planted_crops: 1 },
      { id_rural_producer: SAVED_RURAL_PRODUCER_ID_MOCK, id_planted_crops: 2 },
    ]);
  });

  describe('when it throws an error', () => {
    it('should throw an error if both CPF and CNPJ are provided', async () => {
      try {
        await service.execute({
          ...params,
          cpf: dochelper.CPF.generate(),
          cnpj: dochelper.CNPJ.generate(),
        });
      } catch (error) {
        expect(error).toStrictEqual(
          new BadRequestException(CPF_AND_CNPJ_ERROR),
        );
      }
    });

    it('should throw an error if the sum of arable and vegetation farm areas exceeds the total farm area', async () => {
      try {
        await service.execute({
          ...params,
          cpf: dochelper.CPF.generate(),
          total_farm_area: 10,
        });
      } catch (error) {
        expect(error).toStrictEqual(
          new BadRequestException(
            ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
          ),
        );
      }
    });

    it('should throw an error if a rural producer with the same CPF or CNPJ already exists', async () => {
      jest
        .spyOn(ruralProducerRepository, 'findOne')
        .mockResolvedValueOnce({ id: 1 } as never);

      try {
        await service.execute({
          ...params,
          cpf: dochelper.CPF.generate(),
        });
      } catch (error) {
        expect(error).toStrictEqual(
          new BadRequestException(
            RURAL_PRODUCER_WITH_SAME_CNPJ_OR_CPF_ALREADY_EXISTS,
          ),
        );
      }
    });
  });
});
