import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { CreateAndUpdateVehicleDto } from './create-and-update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(vehicleDto: CreateAndUpdateVehicleDto): Promise<Vehicle> {
    const {
      vehicleName,
      carType,
      lastSuccessfulConnection,
      lastGeolocationPoint,
    } = vehicleDto;
    const vehicle = this.vehicleRepository.create({
      vehicleName,
      carType,
      lastSuccessfulConnection,
      lastGeolocationPoint,
    });

    return this.vehicleRepository.save(vehicle, { reload: true });
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.vehicleRepository.findOneBy({ id });
  }

  async update(
    id: string,
    vehicleDto: CreateAndUpdateVehicleDto,
  ): Promise<Vehicle> {
    await this.vehicleRepository.update(id, vehicleDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
