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
import { DeleteRuralProducerService } from './use-cases/delete-rural-producer.service';

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
  ],
})
export class RuralProducerModule {}
