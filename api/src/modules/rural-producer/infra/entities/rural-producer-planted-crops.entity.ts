import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RuralProducerEntity } from './rural-producer.entity';
import { PlantedCropsEntity } from '../../../planted-crops/entities';

@Entity('rural_producer_planted_crops')
export class RuralProducerPlantedCropsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  id_rural_producer: number;

  @ManyToOne(() => RuralProducerEntity, ({ id }: RuralProducerEntity) => id)
  @JoinColumn({ name: 'id_rural_producer' })
  ruralProducer?: RuralProducerEntity;

  @Column({ type: 'int' })
  id_planted_crops: number;

  @ManyToOne(() => PlantedCropsEntity, ({ id }: PlantedCropsEntity) => id)
  @JoinColumn({ name: 'id_planted_crops' })
  plantedCrops?: PlantedCropsEntity;

  @CreateDateColumn()
  created_at: Date;
}
