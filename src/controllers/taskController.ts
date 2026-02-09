import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/taskService';

//TASKS CRUD:

//Create a New Task for the Authenticated User
export async function createTask(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.id;
        const task = await taskService.createUserTask(userId, req.body);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
}

// Get All Tasks for the Authenticated User
export async function listTasks(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.id;
        const tasks = await taskService.listUserTasks(userId);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
}

// Get a Single Task by ID for the Authenticated User
export async function getTask(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.id;
        const taskId = Number(req.params.id);
        const task = await taskService.getUserTaskById(userId, taskId);
        res.json(task);
    } catch (err) {
        next(err);
    }
}

// Update a Task by ID for the Authenticated User
export async function updateTask(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.id;
        const taskId = Number(req.params.id);
        const task = await taskService.updateUserTask(userId, taskId, req.body);
        res.json(task);
    } catch (err) {
        next(err);
    }
}

// Delete a Task by ID for the Authenticated User
export async function deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.user!.id;
        const taskId = Number(req.params.id);
        await taskService.deleteUserTask(userId, taskId);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
