import {MigrationInterface, QueryRunner} from "typeorm";

export class AllowMoveWithoutCoords1615550814454 implements MigrationInterface {
    name = 'AllowMoveWithoutCoords1615550814454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "move" ALTER COLUMN "x" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "move"."x" IS NULL`);
        await queryRunner.query(`ALTER TABLE "move" ALTER COLUMN "y" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "move"."y" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "move"."y" IS NULL`);
        await queryRunner.query(`ALTER TABLE "move" ALTER COLUMN "y" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "move"."x" IS NULL`);
        await queryRunner.query(`ALTER TABLE "move" ALTER COLUMN "x" SET NOT NULL`);
    }

}
