import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RuralProducerEntity,
  RuralProducerPlantedCropsEntity,
  RuralProducerPlantedCropsRepository,
  RuralProducerRepository,
} from './infra';
import { RuralProducerController } from './controllers';
import { CreateRuralProducerService } from './use-cases';

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
  ],
})
export class RuralProducerModule {}
