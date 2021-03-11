import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveGridFromGames1615471570539 implements MigrationInterface {
    name = 'RemoveGridFromGames1615471570539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "grid"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "grid" character varying NOT NULL`);
    }

}
