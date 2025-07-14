import { MigrationInterface, QueryRunner } from "typeorm";

export class ApoointmentsReportsTechnicianUpdate1752183151705 implements MigrationInterface {
    name = 'ApoointmentsReportsTechnicianUpdate1752183151705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b64d802818f69a2ebc35dd2b8b"`);
        await queryRunner.query(`ALTER TABLE "appointments" RENAME COLUMN "technician" TO "technician_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "technician_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "technician_id" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_8d33e6224b5669e6e45ccf51a6" ON "appointments" ("service_type", "technician_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_8d33e6224b5669e6e45ccf51a6"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "technician_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "technician_id" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" RENAME COLUMN "technician_id" TO "technician"`);
        await queryRunner.query(`CREATE INDEX "IDX_b64d802818f69a2ebc35dd2b8b" ON "appointments" ("service_type", "technician") `);
    }

}
