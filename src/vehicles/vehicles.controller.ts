import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAndUpdateVehicleDto } from './create-and-update-vehicle.dto';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicle.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(
    @Body() createVehicleDto: CreateAndUpdateVehicleDto,
  ): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Post(':id')
  update(
    @Body() updateVehicleDto: CreateAndUpdateVehicleDto,
    @Param('id') id: string,
  ): Promise<Vehicle> {
    return this.vehiclesService.update(id, updateVehicleDto);
  }

  @Get()
  findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }
}
