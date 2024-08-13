import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuralProducerEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([RuralProducerEntity])],
})
export class RuralProducerModule {}
