import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: Number(process.env.PORT) || 4000,
    db: {
        server: process.env.DB_SERVER || 'localhost',
        port: Number(process.env.DB_PORT) || 1433,
        user: process.env.DB_USER || 'sa',
        password: process.env.DB_PASSWORD || 'JGRConstruction123!',
        database: process.env.DB_NAME || 'JGRConstructionDB'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'dev_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    }
};
