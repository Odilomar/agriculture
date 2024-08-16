import { Test, TestingModule } from '@nestjs/testing';
import { GetAmountByCropsService } from './get-amount-by-crops.service';

describe('GetAmountByCropsService', () => {
  let service: GetAmountByCropsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAmountByCropsService],
    }).compile();

    service = module.get<GetAmountByCropsService>(GetAmountByCropsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
