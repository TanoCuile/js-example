import {MigrationInterface, QueryRunner} from "typeorm";

export class dbInit1628156780315 implements MigrationInterface {
    name = 'dbInit1628156780315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(64) NOT NULL, "last_name" character varying(16) NOT NULL, "age" smallint NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "purpose" character varying(32) NOT NULL, "amount" real NOT NULL, "time" bigint NOT NULL, "userId" integer, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_3d211de716f0f14ea7a8a4b1f2c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_3d211de716f0f14ea7a8a4b1f2c"`);
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
