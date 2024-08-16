import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { PlantedCropsEntity } from '../entities';

@Injectable()
export class PlantedCropsRepository {
  constructor(
    @InjectRepository(PlantedCropsEntity)
    private readonly repository: Repository<PlantedCropsEntity>,
  ) {}

  async findOne(options: FindOneOptions<PlantedCropsEntity>) {
    return this.repository.findOne(options);
  }

  async save(entities: Partial<PlantedCropsEntity>[]) {
    return this.repository.save(entities);
  }
}
