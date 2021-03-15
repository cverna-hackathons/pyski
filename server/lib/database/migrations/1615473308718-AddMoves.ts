import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMoves1615473308718 implements MigrationInterface {
    name = 'AddMoves1615473308718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "move" ("id" SERIAL NOT NULL, "moveIndex" integer NOT NULL, "x" integer NOT NULL, "y" integer NOT NULL, "gameId" integer, "playerId" integer, CONSTRAINT "PK_0befa9c6b3a216e49c494b4acc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_e7d286bcab2828876ab2eef3515" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_98696f76384a927d49404462aac" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_98696f76384a927d49404462aac"`);
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_e7d286bcab2828876ab2eef3515"`);
        await queryRunner.query(`DROP TABLE "move"`);
    }

}
