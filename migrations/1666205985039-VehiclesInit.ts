import { MigrationInterface, QueryRunner } from "typeorm";

export class VehiclesInit1666205985039 implements MigrationInterface {
    name = 'VehiclesInit1666205985039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."vehicle_cartype_enum" AS ENUM('SUV', 'Truck', 'Hybrid')`);
        await queryRunner.query(`CREATE TABLE "vehicle" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vehicleName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "carType" "public"."vehicle_cartype_enum" NOT NULL, "lastSuccessfulConnection" character varying, "lastGeolocationPoint" json, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vehicle"`);
        await queryRunner.query(`DROP TYPE "public"."vehicle_cartype_enum"`);
    }

}
