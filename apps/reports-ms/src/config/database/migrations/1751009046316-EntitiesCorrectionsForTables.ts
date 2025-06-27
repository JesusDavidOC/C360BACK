import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntitiesCorrectionsForTables1751009046316 implements MigrationInterface {
  name = 'EntitiesCorrectionsForTables1751009046316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."reports_status_enum" AS ENUM('PENDING', 'GENERATED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cellphone" character varying(20) NOT NULL, "status" "public"."reports_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "csv_file" text NOT NULL, CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.dropTable('technicians', true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "created_at" DROP DEFAULT`);
    await queryRunner.query(`DROP TABLE "reports"`);
    await queryRunner.query(`DROP TYPE "public"."reports_status_enum"`);
  }
}

