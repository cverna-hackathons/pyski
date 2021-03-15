import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGameIndex1615284591828 implements MigrationInterface {
    name = 'AddGameIndex1615284591828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "gameIndex" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "gameIndex"`);
    }

}
