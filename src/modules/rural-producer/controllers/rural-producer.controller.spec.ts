import { Test, TestingModule } from '@nestjs/testing';
import { RuralProducerController } from './rural-producer.controller';
import {
  CreateRuralProducerService,
  DeleteRuralProducerService,
  GetDashboardIntelService,
  UpdateRuralProducerService,
} from '../use-cases';
import {
  CreateRuralProducerDto,
  GetDashboardIntelResponseDto,
  UpdateRuralProducerDto,
} from '../dto';
import { faker } from '@faker-js/faker';

describe('RuralProducerController', () => {
  let ruralProducerController: RuralProducerController;
  let getDashboardIntelService: GetDashboardIntelService;
  let deleteRuralProducerService: DeleteRuralProducerService;
  let updateRuralProducerService: UpdateRuralProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuralProducerController],
      providers: [
        {
          provide: GetDashboardIntelService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: CreateRuralProducerService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteRuralProducerService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateRuralProducerService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    ruralProducerController = module.get<RuralProducerController>(
      RuralProducerController,
    );
    getDashboardIntelService = module.get<GetDashboardIntelService>(
      GetDashboardIntelService,
    );
    deleteRuralProducerService = module.get<DeleteRuralProducerService>(
      DeleteRuralProducerService,
    );
    updateRuralProducerService = module.get<UpdateRuralProducerService>(
      UpdateRuralProducerService,
    );
  });

  describe('getDashboard', () => {
    it('should return dashboard data', async () => {
      const result: GetDashboardIntelResponseDto = {
        totalFarmArea: 100,
        totalFarms: 10,
        totalFarmsByStates: [{ state: 'AM', total: 10 }],
        totalUsedCropsAmount: [
          {
            total: 10,
            name: 'Crops',
          },
        ],
        totalUsedFarmArea: {
          totalArableFarmArea: 100,
          totalVegetationFarmArea: 100,
        },
      };
      jest.spyOn(getDashboardIntelService, 'execute').mockResolvedValue(result);

      expect(await ruralProducerController.getDashboard()).toBe(result);
    });

    it('should throw an error if service fails', async () => {
      const error = new Error('Service failed');
      jest.spyOn(getDashboardIntelService, 'execute').mockRejectedValue(error);

      await expect(ruralProducerController.getDashboard()).rejects.toThrow(
        'Service failed',
      );
    });
  });

  describe('deleteRuralProducerById', () => {
    it('should delete a rural producer by id', async () => {
      const spyOnDeleteRuralProducer = jest.spyOn(
        deleteRuralProducerService,
        'execute',
      );

      await ruralProducerController.deleteRuralProducerById(1);

      expect(spyOnDeleteRuralProducer).toHaveBeenCalledWith(1);
    });

    it('should throw an error if service fails', async () => {
      const error = new Error('Service failed');

      jest
        .spyOn(deleteRuralProducerService, 'execute')
        .mockRejectedValue(error);

      await expect(
        ruralProducerController.deleteRuralProducerById(1),
      ).rejects.toThrow('Service failed');
    });
  });

  describe('updateRuralProducerById', () => {
    const updateDto: UpdateRuralProducerDto = {
      id: 1,
      arable_farm_area: 100,
    };

    it('should update a rural producer by id', async () => {
      const spyOnUpdateRuralProducer = jest.spyOn(
        updateRuralProducerService,
        'execute',
      );
      await ruralProducerController.updateRuralProducerById(
        updateDto.id,
        updateDto,
      );

      expect(spyOnUpdateRuralProducer).toHaveBeenCalledWith(updateDto);
    });

    it('should throw an error if service fails', async () => {
      const error = new Error('Service failed');
      jest
        .spyOn(updateRuralProducerService, 'execute')
        .mockRejectedValue(error);

      await expect(
        ruralProducerController.updateRuralProducerById(1, updateDto),
      ).rejects.toThrow('Service failed');
    });
  });

  describe('createRuralProducer', () => {
    const createDto: CreateRuralProducerDto = {
      arable_farm_area: 150,
      vegetation_farm_area: 50,
      producer_name: faker.person.fullName(),
      farm_name: faker.person.lastName(),
      city: faker.location.city(),
      state: faker.location.state(),
      total_farm_area: 0,
      plantedCropsIds: [1, 2],
    };

    it('should create a rural producer', async () => {
      const spyOnCreateRuralProducer = jest.spyOn(
        ruralProducerController['createRuralProducerUseCase'],
        'execute',
      );

      await ruralProducerController.createRuralProducer(createDto);

      expect(spyOnCreateRuralProducer).toHaveBeenCalledWith(createDto);
    });

    it('should throw an error if service fails', async () => {
      const error = new Error('Service failed');
      jest
        .spyOn(ruralProducerController['createRuralProducerUseCase'], 'execute')
        .mockRejectedValue(error);

      await expect(
        ruralProducerController.createRuralProducer(createDto),
      ).rejects.toThrow('Service failed');
    });
  });
});
