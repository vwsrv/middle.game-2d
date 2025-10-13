import { IDatabaseConfig } from '@/shared/interfaces';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env;

export const dbConfig: IDatabaseConfig = {
  user: POSTGRES_USER || 'postgres',
  host: 'localhost',
  database: POSTGRES_DB || 'db',
  password: POSTGRES_PASSWORD || 'password',
  port: Number(POSTGRES_PORT) || 5432,
};
