import { MigrationInterface, QueryRunner } from 'typeorm';
import { PlantedCropsEntity } from '../../../../modules/planted-crops/entities';
import {
  RuralProducerEntity,
  RuralProducerPlantedCropsEntity,
} from '../../../../modules/rural-producer/infra';

export class AddRelationDataFromRuralProducerToPlantedCrops1723551552181
  implements MigrationInterface
{
  private randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  private randomIntArrayFromInterval(min: number, max: number, length = 1) {
    return Array.from(
      new Set(
        Array.from({ length }, () => this.randomIntFromInterval(min, max)),
      ),
    );
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const ruralProducersRepository =
      queryRunner.manager.getRepository(RuralProducerEntity);
    const ruralProducersPlantedCropsRepository =
      queryRunner.manager.getRepository(RuralProducerPlantedCropsEntity);
    const plantedCropsRepository =
      queryRunner.manager.getRepository(PlantedCropsEntity);

    const ruralProducers = await ruralProducersRepository.find();
    const plantedCrops = await plantedCropsRepository.find();

    for (const ruralProducer of ruralProducers) {
      const randomPlantedCropsAmount = this.randomIntFromInterval(
        0,
        plantedCrops.length - 1,
      );

      const randomArray = this.randomIntArrayFromInterval(
        0,
        plantedCrops.length - 1,
        randomPlantedCropsAmount,
      );

      const ruleProducerPlantedCrops = randomArray.map((randomIndex) => {
        const plantedCrop = plantedCrops[randomIndex];
        return {
          id_planted_crops: plantedCrop.id,
          id_rural_producer: ruralProducer.id,
          created_at: new Date(),
        } as RuralProducerPlantedCropsEntity;
      });

      await ruralProducersPlantedCropsRepository.insert(
        ruleProducerPlantedCrops,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /** no take back */
  }
}
