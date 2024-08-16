import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCropsEntity, PlantedCropsRepository } from './infra';

@Module({
  imports: [TypeOrmModule.forFeature([PlantedCropsEntity])],
  providers: [PlantedCropsRepository],
})
export class PlantedCropsModule {}
