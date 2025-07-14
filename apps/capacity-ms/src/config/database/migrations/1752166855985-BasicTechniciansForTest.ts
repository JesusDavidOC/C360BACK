import { MigrationInterface, QueryRunner } from 'typeorm';

export class BasicTechniciansForTest1752166855985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO technicians (name, services, max_appointments_per_day)
      VALUES
        ('Technician 1', '{REPAIR, MAINTENANCE}', 3),
        ('Technician 2', '{REPAIR}', 2),
        ('Technician 3', '{MAINTENANCE}', 4),
        ('Technician 4', '{REPAIR, MAINTENANCE}', 5),
        ('Technician 5', '{REPAIR}', 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM technicians
      WHERE name IN ('Technician 1', 'Technician 2', 'Technician 3', 'Technician 4', 'Technician 5');
    `);
  }
}
