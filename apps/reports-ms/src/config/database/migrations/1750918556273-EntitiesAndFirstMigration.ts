import { MigrationInterface, QueryRunner } from 'typeorm';

export class EntitiesAndFirstMigration1750918556273 implements MigrationInterface {
  name = 'EntitiesAndFirstMigration1750918556273';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."technicians_services_enum" AS ENUM('REPAIR', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "technicians" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "services" "public"."technicians_services_enum" array NOT NULL, "max_daily_appointments" integer NOT NULL, CONSTRAINT "PK_b14514b23605f79475be53065b3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointments_service_type_enum') THEN
      CREATE TYPE "public"."appointments_service_type_enum" AS ENUM ('REPAIR', 'MAINTENANCE');
    END IF;
  END
  $$;`);
    await queryRunner.query(
      `CREATE TYPE "public"."appointments_status_enum" AS ENUM('PENDING', 'CONFIRMED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cellphone" character varying(20) NOT NULL, "date" date NOT NULL, "service_type" "public"."appointments_service_type_enum" NOT NULL, "status" "public"."appointments_status_enum" NOT NULL, "technician" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b64d802818f69a2ebc35dd2b8b" ON "appointments" ("service_type", "technician") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a53f1fe7e71e2099b948a0ea6" ON "appointments" ("cellphone") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_9a53f1fe7e71e2099b948a0ea6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_b64d802818f69a2ebc35dd2b8b"`);
    await queryRunner.query(`DROP TABLE "appointments"`);
    await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
    await queryRunner.query(`DROP TABLE "technicians"`);
    await queryRunner.query(`DROP TYPE "public"."technicians_services_enum"`);
  }
}
