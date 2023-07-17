import { MigrationInterface, QueryRunner } from 'typeorm';

export class BatchId1689312513160 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "product"' + ' ADD COLUMN "batch_id" varchar'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "product" DROP COLUMN "batch_id"');
  }
}
