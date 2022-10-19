import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Vehicle } from './vehicles/vehicle.entity'; 

config();
 
const configService = new ConfigService();
 
export default new DataSource({
  type: 'postgres',
  url: configService.get('POSTGRES_URL'),
  entities: [Vehicle],
  "ssl": {
    "rejectUnauthorized": false,
    },
});