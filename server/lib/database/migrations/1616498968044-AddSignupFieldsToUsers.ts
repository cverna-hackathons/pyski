import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSignupFieldsToUsers1616498968044 implements MigrationInterface {
    name = 'AddSignupFieldsToUsers1616498968044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isConfirmed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isConfirmed"`);
    }

}
