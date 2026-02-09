import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body as {
            email?: string;
            password?: string;
        };

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password are required' });
        }

        const { user, token } = await authService.register({ email, password });
        res.status(201).json({ user, token });
    } catch (err) {
        next(err);
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body as {
            email?: string;
            password?: string;
        };

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password are required' });
        }

        const { user, token } = await authService.login({ email, password });
        res.json({ user, token });
    } catch (err) {
        next(err);
    }
}
