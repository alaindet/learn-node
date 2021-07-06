import { createPool, PoolConnection } from 'mariadb';

import { MARIADB_POOL_CONFIG } from '../config/database';

const pool = createPool(MARIADB_POOL_CONFIG);

export async function getConnection(): Promise<PoolConnection> {

  let connection: PoolConnection | null = null;

  try {
    connection = await pool.getConnection();
    return connection;
  }
  
  catch (err) {
    connection?.end();
    throw err;
  }
}
