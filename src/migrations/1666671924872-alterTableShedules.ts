import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableShedules1666671924872 implements MigrationInterface {
    name = 'alterTableShedules1666671924872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_properties" ADD "date" TIMESTAMP NOT NULL`);
    }

}
