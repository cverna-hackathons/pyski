import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAuthorToMatch1616585608682 implements MigrationInterface {
    name = 'AddAuthorToMatch1616585608682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" ADD "authorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_aac56e10012dbb332933ac51069" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_aac56e10012dbb332933ac51069"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "authorId"`);
    }

}
