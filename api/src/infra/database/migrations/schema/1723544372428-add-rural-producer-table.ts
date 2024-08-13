import { MigrationInterface, QueryRunner, Table, TableCheck } from 'typeorm';

export class AddRuralProducerTable1723544372428 implements MigrationInterface {
  private tableName = 'rural_producer';
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
        name: 'cpf',
        type: 'varchar',
        length: '11',
        isNullable: true,
      },
      {
        name: 'cnpj',
        type: 'varchar',
        length: '14',
        isNullable: true,
      },
      {
        name: 'producer_name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'farm_name',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'city',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'state',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'total_farm_area',
        type: 'double precision',
        isNullable: false,
      },
      {
        name: 'arable_farm_area',
        type: 'double precision',
        isNullable: false,
      },
      {
        name: 'vegetation_farm_area',
        type: 'double precision',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()',
        isNullable: false,
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        default: 'now()',
        isNullable: true,
      },
    ],
  });
  private tableCheck = new TableCheck({
    name: 'cpf-or-cnpj-check-column',
    expression:
      '(cpf IS NOT NULL AND cnpj IS NULL) OR (cpf IS NULL AND cnpj IS NOT NULL)',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);

    await queryRunner.createCheckConstraint(this.tableName, this.tableCheck);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
