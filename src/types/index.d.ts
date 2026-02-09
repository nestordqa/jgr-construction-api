import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: number;
            email: string;
        };
    };
};

export interface DecodedToken extends JwtPayload {
    sub: number;
    email: string;
};
