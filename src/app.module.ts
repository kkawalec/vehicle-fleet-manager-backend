import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

import { Vehicle } from './vehicles/vehicle.entity';

import {VehiclesInit1666205985039} from '../migrations/1666205985039-VehiclesInit'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('POSTGRES_URL'),
        entities: [Vehicle],
        migrations: [VehiclesInit1666205985039],
        synchronize: false, // do not set to true for production!!
        migrationsTableName: "migrations",
      "ssl": {
        "rejectUnauthorized": false,
        },
      }),
      inject: [ConfigService],
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: 'postgres://deihjtelbbuywj:873ff9aefc7f925c03eb2663ef96efbaad81972e8127f59fa409485ebae6f900@ec2-3-222-74-92.compute-1.amazonaws.com:5432/daosdk9lg30d60',
    //   entities: [Vehicle],
    //   migrations: [/*...*/],
    //   synchronize: false, // do not set to true for production!!
    //   migrationsTableName: "migrations",
    //   "ssl": {
    //     "rejectUnauthorized": false,
    //     },
    // }),
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
