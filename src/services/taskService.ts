import {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask
} from '../models/taskModel';
import { Task } from '../types/models';

// Create a New Task for the Authenticated User
export async function createUserTask(
    userId: number,
    payload: { title?: string; description?: string }
): Promise<Task> {
    if (!payload.title) {
        const error = new Error('Title is required');
        (error as any).statusCode = 400;
        throw error;
    }

    return createTask({
        userId,
        title: payload.title,
        description: payload.description
    });
}

// Get All Tasks for the Authenticated User
export async function listUserTasks(userId: number): Promise<Task[]> {
    return getTasksByUser(userId);
}

// Get a Single Task by ID for the Authenticated User
export async function getUserTaskById(
    userId: number,
    taskId: number
): Promise<Task> {
    const task = await getTaskById(taskId, userId);
    if (!task) {
        const error = new Error('Task not found');
        (error as any).statusCode = 404;
        throw error;
    }
    return task;
}

// Update a Task by ID for the Authenticated User
export async function updateUserTask(
    userId: number,
    taskId: number,
    payload: { title?: string; description?: string; isCompleted?: boolean }
): Promise<Task> {
    const existing = await getTaskById(taskId, userId);
    if (!existing) {
        const error = new Error('Task not found');
        (error as any).statusCode = 404;
        throw error;
    }

    const updated = await updateTask(taskId, userId, {
        title: payload.title ?? existing.Title,
        description: payload.description ?? existing.Description,
        isCompleted:
        typeof payload.isCompleted === 'boolean'
            ? payload.isCompleted
            : existing.IsCompleted
    });

    return updated;
}

// Delete a Task by ID for the Authenticated User
export async function deleteUserTask(
    userId: number,
    taskId: number
): Promise<void> {
    const deleted = await deleteTask(taskId, userId);
    if (!deleted) {
        const error = new Error('Task not found');
        (error as any).statusCode = 404;
        throw error;
    }
}
