import { Test, TestingModule } from '@nestjs/testing';
import { GetDashboardIntelService } from './get-dashboard-intel.service';

describe('GetDashboardIntelService', () => {
  let service: GetDashboardIntelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDashboardIntelService],
    }).compile();

    service = module.get<GetDashboardIntelService>(GetDashboardIntelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
