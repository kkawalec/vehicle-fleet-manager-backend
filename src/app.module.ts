import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

import { Vehicle } from './vehicles/vehicle.entity';

import { VehiclesInit1666205985039 } from '../migrations/1666205985039-VehiclesInit';

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
        migrationsTableName: 'migrations',
        ssl: {
          rejectUnauthorized: false, // temporary setup for dev/testing.
        },
      }),
      inject: [ConfigService],
    }),
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
