import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntitiesCorrectionsForTables1751008364920 implements MigrationInterface {
  name = 'EntitiesCorrectionsForTables1751008364920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_b64d802818f69a2ebc35dd2b8b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9a53f1fe7e71e2099b948a0ea6"`);
    await queryRunner.query(
      `CREATE TYPE "public"."technicians_servicios_enum" AS ENUM('REPAIR', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "technicians" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "servicios" "public"."technicians_servicios_enum" array NOT NULL, "max_appointments_per_day" integer NOT NULL, CONSTRAINT "PK_b14514b23605f79475be53065b3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "cellphone"`);
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "technician"`);
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "appointments" ADD "technician_id" uuid`);
    await queryRunner.query(
      `CREATE INDEX "IDX_8d33e6224b5669e6e45ccf51a6" ON "appointments" ("service_type", "technician_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_8b608e7ae5fa491f6d5e9f82b70" FOREIGN KEY ("technician_id") REFERENCES "technicians"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.dropTable('reports', true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_8b608e7ae5fa491f6d5e9f82b70"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_8d33e6224b5669e6e45ccf51a6"`);
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "technician_id"`);
    await queryRunner.query(`ALTER TABLE "appointments" ADD "created_at" TIMESTAMP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "technician" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."appointments_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "status" "public"."appointments_status_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "cellphone" character varying(20) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "technicians"`);
    await queryRunner.query(`DROP TYPE "public"."technicians_servicios_enum"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_9a53f1fe7e71e2099b948a0ea6" ON "appointments" ("cellphone") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b64d802818f69a2ebc35dd2b8b" ON "appointments" ("service_type", "technician") `,
    );
  }
}

