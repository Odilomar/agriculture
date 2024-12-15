import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
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
  let app: INestApplication;
  let getDashboardIntelService: GetDashboardIntelService;
  let deleteRuralProducerService: DeleteRuralProducerService;
  let updateRuralProducerService: UpdateRuralProducerService;
  let createRuralProducerService: CreateRuralProducerService;

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

    app = module.createNestApplication();
    await app.init();

    getDashboardIntelService = module.get<GetDashboardIntelService>(
      GetDashboardIntelService,
    );
    deleteRuralProducerService = module.get<DeleteRuralProducerService>(
      DeleteRuralProducerService,
    );
    updateRuralProducerService = module.get<UpdateRuralProducerService>(
      UpdateRuralProducerService,
    );
    createRuralProducerService = module.get<CreateRuralProducerService>(
      CreateRuralProducerService,
    );
  });

  afterEach(async () => {
    await app.close();
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

      const response = await request(app.getHttpServer())
        .get('/rural-producer/dashboard')
        .expect(200);

      expect(response.body).toEqual(result);
    });

    it('should throw an error if service fails', async () => {
      jest
        .spyOn(getDashboardIntelService, 'execute')
        .mockRejectedValueOnce(new Error());

      await request(app.getHttpServer())
        .get('/rural-producer/dashboard')
        .expect(500);
    });
  });

  describe('deleteRuralProducerById', () => {
    it('should delete a rural producer by id', async () => {
      const spyOnDeleteRuralProducer = jest.spyOn(
        deleteRuralProducerService,
        'execute',
      );

      await request(app.getHttpServer())
        .delete('/rural-producer/1')
        .expect(200);

      expect(spyOnDeleteRuralProducer).toHaveBeenCalledWith('1');
    });

    it('should throw an error if service fails', async () => {
      jest
        .spyOn(deleteRuralProducerService, 'execute')
        .mockRejectedValue(new Error());

      await request(app.getHttpServer())
        .delete('/rural-producer/1')
        .expect(500);
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

      await request(app.getHttpServer())
        .put('/rural-producer/1')
        .send(updateDto)
        .expect(200);

      expect(spyOnUpdateRuralProducer).toHaveBeenCalledWith({
        ...updateDto,
        id: String(updateDto.id),
      });
    });

    it('should throw an error if service fails', async () => {
      jest
        .spyOn(updateRuralProducerService, 'execute')
        .mockRejectedValue(new Error());

      await request(app.getHttpServer())
        .put('/rural-producer/1')
        .send(updateDto)
        .expect(500);
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
        createRuralProducerService,
        'execute',
      );

      await request(app.getHttpServer())
        .post('/rural-producer')
        .send(createDto)
        .expect(201);

      expect(spyOnCreateRuralProducer).toHaveBeenCalledWith(createDto);
    });

    it('should throw an error if service fails', async () => {
      jest
        .spyOn(createRuralProducerService, 'execute')
        .mockRejectedValue(new Error());

      await request(app.getHttpServer())
        .post('/rural-producer')
        .send(createDto)
        .expect(500);
    });
  });
});
