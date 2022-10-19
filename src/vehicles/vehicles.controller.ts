import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVehicleDto } from './create-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto): string {
    return 'This action adds a new car';
  }

  @Post(':id')
  update(): string {
    return 'This action update a car';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cars';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} car`;
  }
}
