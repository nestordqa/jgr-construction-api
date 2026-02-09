import app from './app';
import { env } from './config/env';
import { getPool } from './db/pool';

const port = env.port;

getPool()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server due to DB error:', err);
        process.exit(1);
    });
