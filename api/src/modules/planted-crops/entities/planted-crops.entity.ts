import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RuralProducerPlantedCropsEntity } from '../../rural-producer/infra';

@Entity('planted_crops')
export class PlantedCropsEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(
    () => RuralProducerPlantedCropsEntity,
    (ruralProducerPlantedCrops) => ruralProducerPlantedCrops.plantedCrops,
  )
  ruralProducerPlantedCrops?: RuralProducerPlantedCropsEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}
