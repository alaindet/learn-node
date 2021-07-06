import { PoolConfig } from 'mariadb';

// TODO: Move into environment
export const MARIADB_POOL_CONFIG: PoolConfig = {
  host: 'localhost',
  port: 3306,
  user: 'yata',
  password: 'yata',
  database: 'yata',
  connectionLimit: 5,
  connectTimeout: 2000,
};
