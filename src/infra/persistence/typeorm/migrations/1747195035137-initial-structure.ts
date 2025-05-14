import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialStructure1747195035137 implements MigrationInterface {
    name = 'InitialStructure1747195035137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "payment-schema"."payments_status_enum" AS ENUM('PENDING', 'PAID', 'REJECTED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "payment-schema"."payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric NOT NULL, "status" "payment-schema"."payments_status_enum" NOT NULL, "order_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment-schema"."payments"`);
        await queryRunner.query(`DROP TYPE "payment-schema"."payments_status_enum"`);
    }

}
