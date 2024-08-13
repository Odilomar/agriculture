import { Test, TestingModule } from '@nestjs/testing';
import { CreateRuralProducerService } from './create-rural-producer.use-case';

describe('CreateRuralProducerService', () => {
  let service: CreateRuralProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateRuralProducerService],
    }).compile();

    service = module.get<CreateRuralProducerService>(
      CreateRuralProducerService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
