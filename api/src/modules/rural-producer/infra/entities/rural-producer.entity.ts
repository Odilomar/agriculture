import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RuralProducerPlantedCropsEntity } from './rural-producer-planted-crops.entity';

@Entity('rural_producer')
@Check(
  '(cpf IS NOT NULL AND cnpj IS NULL) OR (cpf IS NULL AND cnpj IS NOT NULL)',
)
export class RuralProducerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 11, nullable: true })
  cpf?: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  cnpj?: string;

  @Column({ type: 'varchar' })
  producer_name: string;

  @Column({ type: 'varchar' })
  farm_name: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'double precision' })
  total_farm_area: number;

  @Column({ type: 'double precision' })
  arable_farm_area: number;

  @Column({ type: 'double precision' })
  vegetation_farm_area: number;

  @OneToMany(
    () => RuralProducerPlantedCropsEntity,
    (ruralProducerPlantedCrops) => ruralProducerPlantedCrops.ruralProducer,
  )
  ruralProducerPlantedCrops?: RuralProducerPlantedCropsEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date | null;
}
