import { MigrationInterface, QueryRunner } from 'typeorm';
import { RuralProducerEntity } from '../../../../modules/rural-producer/entities';
import { faker } from '@faker-js/faker';
import * as dochelper from 'dochelper';

export class AddRuralProducerData1723546694149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const ruralProducers: RuralProducerEntity[] = Array.from(
      { length: 10 },
      (v, i) => {
        const totalArea = faker.number.float({ min: 100, max: 1000 });
        const arableArea = Math.floor(totalArea / (i + 1));
        const vegetationArea = totalArea - arableArea;

        return {
          id: i + 1,
          producer_name: faker.person.fullName(),
          farm_name: faker.company.name(),
          city: faker.location.city(),
          state: faker.location.state(),
          created_at: new Date(),
          updated_at: new Date(),
          arable_farm_area: Number(arableArea.toFixed(2)),
          vegetation_farm_area: Number(vegetationArea.toFixed(2)),
          total_farm_area: Number(totalArea.toFixed(2)),
          ...(i % 2
            ? { cpf: dochelper.CPF.generate() }
            : { cnpj: dochelper.CNPJ.generate() }),
        };
      },
    );

    for (const ruralProducer of ruralProducers) {
      console.log(ruralProducer);
      await queryRunner.manager.insert(RuralProducerEntity, ruralProducer);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    /** no takes back */
  }
}
