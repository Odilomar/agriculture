import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RuralProducerEntity,
  RuralProducerPlantedCropsEntity,
  RuralProducerPlantedCropsRepository,
  RuralProducerRepository,
} from './infra';
import { RuralProducerController } from './controllers';
import {
  CreateRuralProducerService,
  DeleteRuralProducerService,
  GetDashboardIntelService,
} from './use-cases';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RuralProducerPlantedCropsEntity,
      RuralProducerEntity,
    ]),
  ],
  controllers: [RuralProducerController],
  providers: [
    RuralProducerRepository,
    RuralProducerPlantedCropsRepository,

    CreateRuralProducerService,
    DeleteRuralProducerService,
    GetDashboardIntelService,
  ],
})
export class RuralProducerModule {}
