import { MigrationInterface, QueryRunner } from 'typeorm';
import { PlantedCropsEntity } from '../../../../modules/planted-crops/entities';

export class AddPlantedCrops1723548748104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'];
    const plantedCrops: PlantedCropsEntity[] = names.map(
      (name, index) =>
        ({
          name,
          id: index,
          created_at: new Date(),
          updated_at: new Date(),
        }) as PlantedCropsEntity,
    );

    await queryRunner.manager.insert(PlantedCropsEntity, plantedCrops);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /** no take back */
  }
}
