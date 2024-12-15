import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuralProducerEntity } from '../entities';
import { FindOneOptions, Repository } from 'typeorm';
import { ITotalFarmsByState, ITotalUsedFarmArea } from '../../interfaces';

@Injectable()
export class RuralProducerRepository {
  constructor(
    @InjectRepository(RuralProducerEntity)
    private readonly repository: Repository<RuralProducerEntity>,
  ) {}

  async findOne(options: FindOneOptions<RuralProducerEntity>) {
    return this.repository.findOne(options);
  }

  async save(entities: Partial<RuralProducerEntity>[]) {
    return this.repository.save(entities);
  }

  async delete(id: number) {
    return this.repository.softDelete({ id });
  }

  async totalFarmAreaAmount(): Promise<number> {
    const { total } = await this.repository
      .createQueryBuilder('rural_producer')
      .groupBy('id')
      .select('SUM(total_farm_area) as total')
      .getRawOne();

    return total;
  }

  async totalFarmAmount(): Promise<number> {
    return this.repository.count();
  }

  async totalFarmsByStates(): Promise<ITotalFarmsByState[]> {
    const farms = await this.repository
      .createQueryBuilder('rural_producer')
      .groupBy('state')
      .select(['COUNT(*) as total', 'state'])
      .getRawMany();

    return farms.map((farm) => ({
      ...farm,
      total: Number(farm.total),
    }));
  }

  async totalUsedFarmArea(): Promise<ITotalUsedFarmArea> {
    const {
      total_vegetation_farm_area: totalVegetationFarmArea,
      total_arable_farm_area: totalArableFarmArea,
    } = await this.repository
      .createQueryBuilder('rural_producer')
      .groupBy('id')
      .select([
        'SUM(vegetation_farm_area) as total_vegetation_farm_area',
        'SUM(arable_farm_area) AS total_arable_farm_area',
      ])
      .getRawOne();

    return {
      totalVegetationFarmArea,
      totalArableFarmArea,
    };
  }
}
