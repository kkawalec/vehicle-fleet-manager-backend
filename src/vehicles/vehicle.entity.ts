import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum CarType {
  SUV = 'SUV',
  Truck = 'Truck',
  Hybrid = 'Hybrid',
}

export type GeolocationPoint = {
  lat: string;
  lng: string;
};

@Entity({ name: 'vehicle' })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vehicleName: string;

  @CreateDateColumn()
  createdAt: string;

  @Column({ type: 'enum', enum: CarType })
  carType: CarType;

  @Column({ nullable: true })
  lastSuccessfulConnection: string;

  @Column({ type: 'json', nullable: true })
  lastGeolocationPoint: GeolocationPoint;
}
