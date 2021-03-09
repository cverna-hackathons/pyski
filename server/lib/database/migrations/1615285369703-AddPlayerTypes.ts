import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPlayerTypes1615285369703 implements MigrationInterface {
    name = 'AddPlayerTypes1615285369703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "player_type_enum" AS ENUM('interactive', 'local', 'repository')`);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "type" "player_type_enum" NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match" ADD "playerAId" integer`);
        await queryRunner.query(`ALTER TABLE "match" ADD "playerBId" integer`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_e2b0a54a83c6f816f96d4610736" FOREIGN KEY ("playerAId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_919e74d1526d2c7023ed9bab7ae" FOREIGN KEY ("playerBId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_919e74d1526d2c7023ed9bab7ae"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_e2b0a54a83c6f816f96d4610736"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "playerBId"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "playerAId"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TYPE "player_type_enum"`);
    }

}
