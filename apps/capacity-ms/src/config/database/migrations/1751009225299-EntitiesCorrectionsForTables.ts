import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesCorrectionsForTables1751009225299 implements MigrationInterface {
    name = 'EntitiesCorrectionsForTables1751009225299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technicians" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "technicians" DROP COLUMN "servicios"`);
        await queryRunner.query(`DROP TYPE "public"."technicians_servicios_enum"`);
        await queryRunner.query(`ALTER TABLE "technicians" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."technicians_services_enum" AS ENUM('REPAIR', 'MAINTENANCE')`);
        await queryRunner.query(`ALTER TABLE "technicians" ADD "services" "public"."technicians_services_enum" array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technicians" DROP COLUMN "services"`);
        await queryRunner.query(`DROP TYPE "public"."technicians_services_enum"`);
        await queryRunner.query(`ALTER TABLE "technicians" DROP COLUMN "name"`);
        await queryRunner.query(`CREATE TYPE "public"."technicians_servicios_enum" AS ENUM('REPAIR', 'MAINTENANCE')`);
        await queryRunner.query(`ALTER TABLE "technicians" ADD "servicios" "public"."technicians_servicios_enum" array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "technicians" ADD "nombre" character varying(100) NOT NULL`);
    }

}
