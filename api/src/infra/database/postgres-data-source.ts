import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { PlantedCropsEntity } from '../../modules/planted-crops/entities';
import {
  RuralProducerEntity,
  RuralProducerPlantedCropsEntity,
} from '../../modules/rural-producer/infra';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    RuralProducerEntity,
    RuralProducerPlantedCropsEntity,
    PlantedCropsEntity,
  ],
  synchronize: Boolean(process.env.TYPEORM_SYNCRONIZE) || false,
  migrations: [process.env.TYPEORM_MIGRATIONS],
});
