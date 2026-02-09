import { config as SqlConfig } from 'mssql';
import { env } from './env';

// DB CONFIGURATION
export const dbConfig: SqlConfig = {
    user: env.db.user,
    password: env.db.password,
    server: env.db.server,
    port: env.db.port,
    database: env.db.database,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};
