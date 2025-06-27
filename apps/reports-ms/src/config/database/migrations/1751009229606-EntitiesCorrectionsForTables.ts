import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntitiesCorrectionsForTables1751009229606 implements MigrationInterface {
  name = 'EntitiesCorrectionsForTables1751009229606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "created_at" DROP DEFAULT`);
    await queryRunner.query(`DROP TABLE "reports"`);
    await queryRunner.query(`DROP TYPE "public"."reports_status_enum"`);
  }
}

