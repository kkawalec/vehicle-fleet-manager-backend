import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersService } from './users.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  providers: [
    //    UsersService
  ],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
