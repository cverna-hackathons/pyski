import {MigrationInterface, QueryRunner} from "typeorm";

export class MatchesAndGames1615282213434 implements MigrationInterface {
    name = 'MatchesAndGames1615282213434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" SERIAL NOT NULL, "numOfGames" integer NOT NULL, "winningLength" integer NOT NULL, "timeout" integer NOT NULL, "maxRounds" integer NOT NULL, "gridWidth" integer NOT NULL, "gridHeight" integer NOT NULL, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "playerIndex" integer NOT NULL, "grid" character varying NOT NULL, "faultOfPlayer" integer, "winner" integer, "matchId" integer, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_c502e4de68e3dd7899d7cc071f8" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_c502e4de68e3dd7899d7cc071f8"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "match"`);
    }

}
