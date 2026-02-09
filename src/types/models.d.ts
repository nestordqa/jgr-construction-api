export interface User {
    Id: number;
    Email: string;
    PasswordHash?: string;
    CreatedAt: Date;
}

export interface Task {
    Id: number;
    UserId: number;
    Title: string;
    Description: string | null;
    IsCompleted: boolean;
    CreatedAt: Date;
    UpdatedAt: Date | null;
}
