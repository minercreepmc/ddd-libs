import { registerAs } from '@nestjs/config';
import { DatabaseConfigPort } from '../ports';

const config: DatabaseConfigPort = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const databaseConfig = registerAs('database', () => config);
