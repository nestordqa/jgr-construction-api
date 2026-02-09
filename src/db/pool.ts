import sql, { ConnectionPool } from 'mssql';
import { dbConfig } from '../config/db';

let pool: ConnectionPool | null = null;

export async function getPool(): Promise<ConnectionPool> {
    if (pool) return pool;
    try {
        pool = await sql.connect(dbConfig);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
        throw err;
    }
}

export { sql };
