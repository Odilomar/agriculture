import { Test, TestingModule } from '@nestjs/testing';
import { DeleteRuralProducerService } from './delete-rural-producer.service';
import { RuralProducerRepository } from '../infra';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { RURAL_PRODUCER_NOT_FOUND } from '../../../shared';

describe('DeleteRuralProducerService', () => {
  let service: DeleteRuralProducerService;
  let ruralProducerRepository: RuralProducerRepository;

  const FAKE_RURAL_PRODUCER_ID = faker.number.int();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RuralProducerRepository,
          useValue: {
            findOne: jest
              .fn()
              .mockResolvedValue({ id: FAKE_RURAL_PRODUCER_ID }),
            delete: jest.fn(),
          },
        },
        DeleteRuralProducerService,
      ],
    }).compile();

    service = module.get<DeleteRuralProducerService>(
      DeleteRuralProducerService,
    );
    ruralProducerRepository = module.get<RuralProducerRepository>(
      RuralProducerRepository,
    );
  });

  it('should delete rural producer', async () => {
    await service.execute(FAKE_RURAL_PRODUCER_ID);

    expect(ruralProducerRepository.findOne).toHaveBeenCalledTimes(1);
    expect(ruralProducerRepository.findOne).toHaveBeenCalledWith({
      where: { id: FAKE_RURAL_PRODUCER_ID },
    });
    expect(ruralProducerRepository.delete).toHaveBeenCalledTimes(1);
  });

  describe('when it throws an error', () => {
    it('should throw rural producer not found error', async () => {
      jest
        .spyOn(ruralProducerRepository, 'findOne')
        .mockResolvedValueOnce(null);

      try {
        await service.execute(FAKE_RURAL_PRODUCER_ID);
      } catch (error) {
        expect(error).toStrictEqual(
          new NotFoundException(RURAL_PRODUCER_NOT_FOUND),
        );
      }

      expect(ruralProducerRepository.findOne).toHaveBeenCalledTimes(1);
      expect(ruralProducerRepository.findOne).toHaveBeenCalledWith({
        where: { id: FAKE_RURAL_PRODUCER_ID },
      });
      expect(ruralProducerRepository.delete).toHaveBeenCalledTimes(0);
    });
  });
});
