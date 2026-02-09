import { JwtPayload } from 'jsonwebtoken';

// Extend Express Request Interface to Include User Information from JWT
declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: number;
            email: string;
        };
    };
};

// Define a DecodedToken Interface for JWT Payloads
export interface DecodedToken extends JwtPayload {
    sub: number;
    email: string;
};
