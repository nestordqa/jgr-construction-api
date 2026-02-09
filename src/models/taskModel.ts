import { getPool, sql } from '../db/pool';
import { Task } from '../types/models';

// Create a New Task for the Authenticated User
export async function createTask(params: {
    userId: number;
    title: string;
    description?: string;
}): Promise<Task> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('userId', sql.Int, params.userId)
        .input('title', sql.NVarChar(255), params.title)
        .input('description', sql.NVarChar(1000), params.description || null)
        .query<Task>(`
            INSERT INTO dbo.Tasks (userId, title, description)
            OUTPUT INSERTED.*
            VALUES (@userId, @title, @description)
        `);

    return result.recordset[0];
}

// Get All Tasks for the Authenticated User
export async function getTasksByUser(userId: number): Promise<Task[]> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .query<Task>(`
            SELECT *
            FROM dbo.Tasks
            WHERE userId = @userId
            ORDER BY createdAt DESC
        `);

    return result.recordset;
}

// Get task by ID for the Authenticated User
export async function getTaskById(
    id: number,
    userId: number
): Promise<Task | undefined> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id', sql.Int, id)
        .input('userId', sql.Int, userId)
        .query<Task>(`
            SELECT *
            FROM dbo.Tasks
            WHERE id = @id AND userId = @userId
        `);

    return result.recordset[0];
}

// Update a Task by ID for the Authenticated User
export async function updateTask(
    id: number,
    userId: number,
    params: {
        title: string;
        description?: string | null;
        isCompleted: boolean;
    }
): Promise<Task> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id', sql.Int, id)
        .input('userId', sql.Int, userId)
        .input('title', sql.NVarChar(255), params.title)
        .input('description', sql.NVarChar(1000), params.description || null)
        .input('isCompleted', sql.Bit, params.isCompleted)
        .query<Task>(`
            UPDATE dbo.Tasks
            SET title = @title,
                description = @description,
                isCompleted = @isCompleted,
                updatedAt = SYSUTCDATETIME()
            OUTPUT INSERTED.*
            WHERE id = @id AND userId = @userId
        `);

    return result.recordset[0];
}

// Delete a Task by ID for the Authenticated User
export async function deleteTask(
    id: number,
    userId: number
): Promise<boolean> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id', sql.Int, id)
        .input('userId', sql.Int, userId)
        .query(`
            DELETE FROM dbo.Tasks
            WHERE id = @id AND userId = @userId
        `);

    return result.rowsAffected[0] > 0;
}
