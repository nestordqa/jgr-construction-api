import { getPool, sql } from '../db/pool';
import { User } from '../types/models';

export async function createUser(params: {
    email: string;
    passwordHash: string;
}): Promise<User> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('Email', sql.NVarChar(255), params.email)
        .input('PasswordHash', sql.NVarChar(255), params.passwordHash)
        .query<User>(`
            INSERT INTO dbo.Users (Email, PasswordHash)
            OUTPUT INSERTED.Id, INSERTED.Email, INSERTED.CreatedAt
            VALUES (@Email, @PasswordHash)
        `);

    return result.recordset[0];
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('Email', sql.NVarChar(255), email)
        .query<User>(`
            SELECT Id, Email, PasswordHash, CreatedAt
            FROM dbo.Users
            WHERE Email = @Email
        `);

    return result.recordset[0];
}

export async function getUserById(id: number): Promise<User | undefined> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('Id', sql.Int, id)
        .query<User>(`
            SELECT Id, Email, CreatedAt
            FROM dbo.Users
            WHERE Id = @Id
        `);

    return result.recordset[0];
}
