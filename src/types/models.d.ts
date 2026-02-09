// src/types/models.d.ts
// Define TypeScript Interfaces for User and Task Models
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
