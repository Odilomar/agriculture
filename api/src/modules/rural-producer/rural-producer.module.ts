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
  UpdateRuralProducerService,
} from './use-cases';
import { PlantedCropsModule } from '../planted-crops/planted-crops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RuralProducerPlantedCropsEntity,
      RuralProducerEntity,
    ]),
    PlantedCropsModule,
  ],
  controllers: [RuralProducerController],
  providers: [
    RuralProducerRepository,
    RuralProducerPlantedCropsRepository,

    CreateRuralProducerService,
    DeleteRuralProducerService,
    GetDashboardIntelService,
    UpdateRuralProducerService,
  ],
})
export class RuralProducerModule {}
