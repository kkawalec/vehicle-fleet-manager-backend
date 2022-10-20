import { CarType, GeolocationPoint } from './vehicle.entity';

export class CreateAndUpdateVehicleDto {
  vehicleName: string;
  carType: CarType;
  lastSuccessfulConnection?: string;
  lastGeolocationPoint: GeolocationPoint;
}
