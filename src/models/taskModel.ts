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
        .input('UserId', sql.Int, params.userId)
        .input('Title', sql.NVarChar(255), params.title)
        .input('Description', sql.NVarChar(1000), params.description || null)
        .query<Task>(`
            INSERT INTO dbo.Tasks (UserId, Title, Description)
            OUTPUT INSERTED.*
            VALUES (@UserId, @Title, @Description)
        `);

    return result.recordset[0];
}

// Get All Tasks for the Authenticated User
export async function getTasksByUser(userId: number): Promise<Task[]> {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('UserId', sql.Int, userId)
        .query<Task>(`
            SELECT *
            FROM dbo.Tasks
            WHERE UserId = @UserId
            ORDER BY CreatedAt DESC
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
        .input('Id', sql.Int, id)
        .input('UserId', sql.Int, userId)
        .query<Task>(`
            SELECT *
            FROM dbo.Tasks
            WHERE Id = @Id AND UserId = @UserId
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
        .input('Id', sql.Int, id)
        .input('UserId', sql.Int, userId)
        .input('Title', sql.NVarChar(255), params.title)
        .input('Description', sql.NVarChar(1000), params.description || null)
        .input('IsCompleted', sql.Bit, params.isCompleted)
        .query<Task>(`
            UPDATE dbo.Tasks
            SET Title = @Title,
                Description = @Description,
                IsCompleted = @IsCompleted,
                UpdatedAt = SYSUTCDATETIME()
            OUTPUT INSERTED.*
            WHERE Id = @Id AND UserId = @UserId
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
        .input('Id', sql.Int, id)
        .input('UserId', sql.Int, userId)
        .query(`
            DELETE FROM dbo.Tasks
            WHERE Id = @Id AND UserId = @UserId
        `);

    return result.rowsAffected[0] > 0;
}
