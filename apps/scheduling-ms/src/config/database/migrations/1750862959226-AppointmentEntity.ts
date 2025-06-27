import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppointmentEntity1750862959226 implements MigrationInterface {
  name = 'AppointmentEntity1750862959226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cellphone" character varying NOT NULL, "date" date NOT NULL, "service_type" "public"."appointments_service_type_enum" NOT NULL, "status" "public"."appointments_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_090ed91a83a3e7a0578ac21dee" ON "appointments" ("id", "cellphone") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a951dbc086a64157edd85537e9" ON "appointments" ("date", "service_type") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a53f1fe7e71e2099b948a0ea6" ON "appointments" ("cellphone") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_9a53f1fe7e71e2099b948a0ea6"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a951dbc086a64157edd85537e9"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_090ed91a83a3e7a0578ac21dee"`);
    await queryRunner.query(`DROP TABLE "appointments"`);
  }
}
