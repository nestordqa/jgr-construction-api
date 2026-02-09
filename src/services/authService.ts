import { getUserByEmail, createUser } from '../models/userModel';
import { User } from '../types/models';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/token';

interface AuthResult {
    user: User;
    token: string;
}

// Register a New User and Return Auth Result
export async function register(params: {
    email: string;
    password: string;
}): Promise<AuthResult> {
    const existing = await getUserByEmail(params.email);
    if (existing) {
        const error = new Error('Email already in use');
        (error as any).statusCode = 400;
        throw error;
    }

    const passwordHash = await hashPassword(params.password);
    const user = await createUser({ email: params.email, passwordHash });
    const token = generateToken({ sub: user.Id, email: user.Email });

    return { user, token };
}

// Authenticate User and Return Auth Result
export async function login(params: {
    email: string;
    password: string;
}): Promise<AuthResult> {
    const user = await getUserByEmail(params.email);
    if (!user || !user.PasswordHash) {
        const error = new Error('Invalid credentials');
        (error as any).statusCode = 401;
        throw error;
    }

    const isValid = await comparePassword(params.password, user.PasswordHash);
    if (!isValid) {
        const error = new Error('Invalid credentials');
        (error as any).statusCode = 401;
        throw error;
    }

    const token = generateToken({ sub: user.Id, email: user.Email });
    return { user, token };
}
