import { Test, TestingModule } from '@nestjs/testing';
import { GetAmountByCropsService } from './get-amount-by-crops.service';
import { PlantedCropsRepository } from '../infra';
import { faker } from '@faker-js/faker';

describe('GetAmountByCropsService', () => {
  let service: GetAmountByCropsService;

  const TOTAL_USED_CROPS_AMOUNT_MOCK = faker.number.int();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PlantedCropsRepository,
          useValue: {
            totalUsedCropsAmount: jest
              .fn()
              .mockResolvedValue(TOTAL_USED_CROPS_AMOUNT_MOCK),
          },
        },
        GetAmountByCropsService,
      ],
    }).compile();

    service = module.get<GetAmountByCropsService>(GetAmountByCropsService);
  });

  it('should return correct value', async () => {
    const result = await service.execute();

    expect(result).toBe(TOTAL_USED_CROPS_AMOUNT_MOCK);
  });
});
