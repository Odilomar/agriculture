import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuralProducerPlantedCropsEntity } from '../entities';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class RuralProducerPlantedCropsRepository {
  constructor(
    @InjectRepository(RuralProducerPlantedCropsEntity)
    private readonly repository: Repository<RuralProducerPlantedCropsEntity>,
  ) {}

  async findOne(options: FindOneOptions<RuralProducerPlantedCropsEntity>) {
    return this.repository.findOne(options);
  }

  async save(entities: Partial<RuralProducerPlantedCropsEntity>[]) {
    return this.repository.save(entities);
  }
}
