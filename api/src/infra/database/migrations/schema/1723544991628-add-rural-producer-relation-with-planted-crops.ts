import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddRuralProducerRelationWithPlantedCrops1723544991628
  implements MigrationInterface
{
  private ruralProducerTableName = 'rural_producer';
  private plantedCropsTableName = 'planted_crops';
  private tableName = 'rural_producer_planted_crops';
  private table = new Table({
    name: this.tableName,
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'id_rural_producer',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'id_planted_crops',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['id_rural_producer'],
        referencedTableName: this.ruralProducerTableName,
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['id_planted_crops'],
        referencedTableName: this.plantedCropsTableName,
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
