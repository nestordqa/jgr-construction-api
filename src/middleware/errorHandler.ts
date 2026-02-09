import { Request, Response, NextFunction } from 'express';

// Centralized Error Handling Middleware
export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    const status = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(status).json({ message });
};
