import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { Vehicle, CarType } from './vehicle.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const repositoryMockFactory = jest.fn(() => ({
  findOneBy: jest.fn((entity) => entity),
  find: jest.fn(() => [
    { id: 'first-id', vehicleName: 'the name' },
    { id: 'second-id', vehicleName: 'the other name' },
  ]),
  delete: jest.fn(() => true),
  update: jest.fn((id, entity) => ({ id, ...entity })),
  create: jest.fn((entity) => ({ id: 'new-id', ...entity })),
  save: jest.fn((entity) => ({ id: 'new-id', ...entity })),
}));

describe('VehiclesController', () => {
  let controller: VehiclesController;
  let service: VehiclesService;
  let repositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        VehiclesService,
        {
          provide: getRepositoryToken(Vehicle),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    controller = module.get<VehiclesController>(VehiclesController);
    service = module.get<VehiclesService>(VehiclesService);
    repositoryMock = module.get(getRepositoryToken(Vehicle));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repositoryMock).toBeDefined();
  });

  it('should find vehicle by id', async () => {
    const vehicleEntity = await controller.findOne('some-uuid');
    expect(vehicleEntity).toEqual({ id: 'some-uuid' });
  });

  it('should get list of vehicles', async () => {
    const vehiclesEntities = await controller.findAll();
    expect(vehiclesEntities).toEqual([
      { id: 'first-id', vehicleName: 'the name' },
      { id: 'second-id', vehicleName: 'the other name' },
    ]);
  });

  it('should delete vehicle by id', async () => {
    const result = await controller.remove('some-uuid');
    expect(result).toBe(true);
  });

  it('should update vehicle by id', async () => {
    const result = await controller.update(
      {
        vehicleName: 'new name',
        carType: CarType.SUV,
        lastGeolocationPoint: {
          lat: '30.346805868962072',
          lng: '-6.064453125',
        },
      },
      'some-uuid',
    );
    expect(result).toEqual({ id: 'some-uuid' });
  });

  it('should create vehicle', async () => {
    const result = await controller.create({
      vehicleName: 'new name',
      carType: CarType.SUV,
      lastGeolocationPoint: {
        lat: '30.346805868962072',
        lng: '-6.064453125',
      },
    });
    expect(result).toEqual({
      id: 'new-id',
      vehicleName: 'new name',
      carType: CarType.SUV,
      lastGeolocationPoint: {
        lat: '30.346805868962072',
        lng: '-6.064453125',
      },
    });
  });
});
