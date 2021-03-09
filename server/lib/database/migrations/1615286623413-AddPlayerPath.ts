import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPlayerPath1615286623413 implements MigrationInterface {
    name = 'AddPlayerPath1615286623413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "player" ADD "path" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "player" DROP COLUMN "name"`);
    }

}
