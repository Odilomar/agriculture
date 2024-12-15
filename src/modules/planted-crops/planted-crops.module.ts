import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCropsEntity, PlantedCropsRepository } from './infra';
import { GetAmountByCropsService } from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([PlantedCropsEntity])],
  providers: [PlantedCropsRepository, GetAmountByCropsService],
  exports: [GetAmountByCropsService],
})
export class PlantedCropsModule {}
