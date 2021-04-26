import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedAtToResults1619434667125 implements MigrationInterface {
    name = 'AddCreatedAtToResults1619434667125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP COLUMN "createdAt"`);
    }

}
