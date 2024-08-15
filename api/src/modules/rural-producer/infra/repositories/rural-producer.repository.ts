import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RuralProducerEntity } from '../entities';
import { FindOneOptions, Repository } from 'typeorm';

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
}
