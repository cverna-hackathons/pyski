import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascadeToParents1615811177338 implements MigrationInterface {
    name = 'AddCascadeToParents1615811177338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_98696f76384a927d49404462aac"`);
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_e7d286bcab2828876ab2eef3515"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_e2b0a54a83c6f816f96d4610736"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_919e74d1526d2c7023ed9bab7ae"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_c502e4de68e3dd7899d7cc071f8"`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_98696f76384a927d49404462aac" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_e7d286bcab2828876ab2eef3515" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_e2b0a54a83c6f816f96d4610736" FOREIGN KEY ("playerAId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_919e74d1526d2c7023ed9bab7ae" FOREIGN KEY ("playerBId") REFERENCES "player"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_c502e4de68e3dd7899d7cc071f8" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_c502e4de68e3dd7899d7cc071f8"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_919e74d1526d2c7023ed9bab7ae"`);
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_e2b0a54a83c6f816f96d4610736"`);
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_e7d286bcab2828876ab2eef3515"`);
        await queryRunner.query(`ALTER TABLE "move" DROP CONSTRAINT "FK_98696f76384a927d49404462aac"`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_c502e4de68e3dd7899d7cc071f8" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_919e74d1526d2c7023ed9bab7ae" FOREIGN KEY ("playerBId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_e2b0a54a83c6f816f96d4610736" FOREIGN KEY ("playerAId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_e7d286bcab2828876ab2eef3515" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "move" ADD CONSTRAINT "FK_98696f76384a927d49404462aac" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
