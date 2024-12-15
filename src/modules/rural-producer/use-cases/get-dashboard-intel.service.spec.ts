import { Test, TestingModule } from '@nestjs/testing';
import { GetDashboardIntelService } from './get-dashboard-intel.service';
import { RuralProducerRepository } from '../infra';
import { GetAmountByCropsService } from '../../planted-crops/use-cases';
import { faker } from '@faker-js/faker';
import { ITotalFarmsByState, ITotalUsedFarmArea } from '../interfaces';
import { ITotalUsedCropsAmount } from '../../planted-crops/interfaces';

describe('GetDashboardIntelService', () => {
  let service: GetDashboardIntelService;

  const TOTAL_FARM_AREA_AMOUNT_MOCK = faker.number.int();
  const TOTAL_FARM_AMOUNT_MOCK = faker.number.int();
  const TOTAL_FARM_STATES_MOCK: ITotalFarmsByState[] = Array.from(
    { length: 10 },
    () => ({
      state: faker.location.state(),
      total: faker.number.int(),
    }),
  );
  const TOTAL_USED_AREA_MOCK: ITotalUsedFarmArea[] = Array.from(
    { length: 10 },
    () => ({
      totalArableFarmArea: faker.number.int(),
      totalVegetationFarmArea: faker.number.int(),
    }),
  );
  const TOTAL_AMOUNT_BY_CROPS_MOCK: ITotalUsedCropsAmount[] = Array.from(
    { length: 10 },
    () => ({
      name: faker.string.sample(),
      total: faker.number.int(),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RuralProducerRepository,
          useValue: {
            totalFarmAreaAmount: jest
              .fn()
              .mockResolvedValue(TOTAL_FARM_AREA_AMOUNT_MOCK),
            totalFarmAmount: jest
              .fn()
              .mockResolvedValue(TOTAL_FARM_AMOUNT_MOCK),
            totalFarmsByStates: jest
              .fn()
              .mockResolvedValue(TOTAL_FARM_STATES_MOCK),
            totalUsedFarmArea: jest
              .fn()
              .mockResolvedValue(TOTAL_USED_AREA_MOCK),
          },
        },
        {
          provide: GetAmountByCropsService,
          useValue: {
            execute: jest.fn().mockResolvedValue(TOTAL_AMOUNT_BY_CROPS_MOCK),
          },
        },
        GetDashboardIntelService,
      ],
    }).compile();

    service = module.get<GetDashboardIntelService>(GetDashboardIntelService);
  });

  it('should return correct value', async () => {
    const result = await service.execute();
    expect(result).toStrictEqual({
      totalFarmArea: TOTAL_FARM_AREA_AMOUNT_MOCK,
      totalUsedFarmArea: TOTAL_USED_AREA_MOCK,
      totalFarms: TOTAL_FARM_AMOUNT_MOCK,
      totalFarmsByStates: TOTAL_FARM_STATES_MOCK,
      totalUsedCropsAmount: TOTAL_AMOUNT_BY_CROPS_MOCK,
    });
  });
});
