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
  id INT IDENTITY(1,1) PRIMARY KEY,
  email NVARCHAR(255) NOT NULL UNIQUE,
  passwordHash NVARCHAR(255) NOT NULL,
  createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

IF OBJECT_ID('dbo.Tasks', 'U') IS NOT NULL
  DROP TABLE dbo.Tasks;
GO

CREATE TABLE dbo.Tasks (
  id INT IDENTITY(1,1) PRIMARY KEY,
  userId INT NOT NULL,
  title NVARCHAR(255) NOT NULL,
  description NVARCHAR(1000) NULL,
  isCompleted BIT NOT NULL DEFAULT 0,
  createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  updatedAt DATETIME2 NULL,
  CONSTRAINT FK_Tasks_Users FOREIGN KEY (userId)
    REFERENCES dbo.Users (id)
    ON DELETE CASCADE
);
GO

-- Usuario de prueba (password en texto plano, solo de muestra)
INSERT INTO dbo.Users (email, passwordHash)
VALUES ('nestor@jgr-construction.com', 'Test123456789*');
GO
