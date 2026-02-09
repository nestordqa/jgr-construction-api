import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token';

// Authentication Middleware to Protect Routes
export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const decoded = verifyToken(token);
        req.user = {
            id: decoded.sub,
            email: decoded.email
        };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
