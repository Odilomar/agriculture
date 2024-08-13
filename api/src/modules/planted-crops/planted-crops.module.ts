import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCropsEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([PlantedCropsEntity])],
})
export class PlantedCropsModule {}
