import { Test, TestingModule } from '@nestjs/testing';
import { RuralProducerController } from './rural-producer.controller';

describe('RuralProducerController', () => {
  let controller: RuralProducerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuralProducerController],
    }).compile();

    controller = module.get<RuralProducerController>(RuralProducerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
