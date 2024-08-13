import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RuralProducerEntity,
  RuralProducerPlantedCropsEntity,
} from './entities';
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
  providers: [CreateRuralProducerService],
})
export class RuralProducerModule {}
