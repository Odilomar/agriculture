import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantedCropsEntity } from '../entities';

@Injectable()
export class PlantedCropsRepository {
  constructor(
    @InjectRepository(PlantedCropsEntity)
    private readonly repository: Repository<PlantedCropsEntity>,
  ) {}

  async totalUsedCropsAmount() {
    const usedCrops = await this.repository
      .createQueryBuilder('planted_crops')
      .leftJoinAndSelect(
        'planted_crops.ruralProducerPlantedCrops',
        'rural_producer_planted_crops',
      )
      .groupBy('planted_crops.id')
      .addGroupBy('planted_crops.name')
      .select(['planted_crops.name as name', 'COUNT(*) as total'])
      .getRawMany();

    return usedCrops.map((crop) => ({
      ...crop,
      total: Number(crop.total),
    }));
  }
}
