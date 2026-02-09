-- sql/init.sql

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'JGRConstructionDB')
BEGIN
  CREATE DATABASE JGRConstructionDB;
END;
GO

USE JGRConstructionDB;
GO

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
  DROP TABLE dbo.Users;
GO

CREATE TABLE dbo.Users (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  Email NVARCHAR(255) NOT NULL UNIQUE,
  PasswordHash NVARCHAR(255) NOT NULL,
  CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.Tasks', 'U') IS NOT NULL
  DROP TABLE dbo.Tasks;
GO

CREATE TABLE dbo.Tasks (
  Id INT IDENTITY(1,1) PRIMARY KEY,
  UserId INT NOT NULL,
  Title NVARCHAR(255) NOT NULL,
  Description NVARCHAR(1000) NULL,
  IsCompleted BIT NOT NULL DEFAULT 0,
  CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  UpdatedAt DATETIME2 NULL,
  CONSTRAINT FK_Tasks_Users FOREIGN KEY (UserId)
    REFERENCES dbo.Users (Id)
    ON DELETE CASCADE
);
GO

-- Usuario de prueba (password en texto plano, solo de muestra)
INSERT INTO dbo.Users (Email, PasswordHash)
VALUES ('nestor@jgr-construction.com', 'Test123456789*');
GO
