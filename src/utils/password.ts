import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// Hash a Plain Text Password
export async function hashPassword(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

// Compare a Plain Text Password with a Hash
export async function comparePassword(
    plainPassword: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
};
