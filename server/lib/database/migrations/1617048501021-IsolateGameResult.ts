import {MigrationInterface, QueryRunner} from "typeorm";

export class IsolateGameResult1617048501021 implements MigrationInterface {
    name = 'IsolateGameResult1617048501021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "result" ("id" SERIAL NOT NULL, "faultOfPlayer" integer, "winner" integer, "gameId" integer NOT NULL, CONSTRAINT "REL_4233ef2a25b3c72e910b176c55" UNIQUE ("gameId"), CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "faultOfPlayer"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "winner"`);
        await queryRunner.query(`ALTER TABLE "result" ADD CONSTRAINT "FK_4233ef2a25b3c72e910b176c55d" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "result" DROP CONSTRAINT "FK_4233ef2a25b3c72e910b176c55d"`);
        await queryRunner.query(`ALTER TABLE "game" ADD "winner" integer`);
        await queryRunner.query(`ALTER TABLE "game" ADD "faultOfPlayer" integer`);
        await queryRunner.query(`DROP TABLE "result"`);
    }

}
