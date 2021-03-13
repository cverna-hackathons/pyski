import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovePlayerIndexFromGames1615667562970 implements MigrationInterface {
    name = 'RemovePlayerIndexFromGames1615667562970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "playerIndex"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "playerIndex" integer NOT NULL`);
    }

}
