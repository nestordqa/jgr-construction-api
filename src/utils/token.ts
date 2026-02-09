import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { DecodedToken } from '../types';

export function generateToken(payload: {
    sub: number;
    email: string;
}): string {
    return jwt.sign(payload, env.jwt.secret as string, {
        expiresIn: env.jwt.expiresIn
    });
}

export function verifyToken(token: string): DecodedToken {
    const decoded = jwt.verify(token, env.jwt.secret as string);
    if (
        typeof decoded === 'object' &&
        decoded !== null &&
        'email' in decoded &&
        'sub' in decoded
    ) {
        return decoded as unknown as DecodedToken;
    }
    throw new Error('Token inválido');
}
