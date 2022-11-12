CREATE TABLE [dbo].[Employees] (
    [EmployeeID]    INT            IDENTITY (1, 1) NOT NULL,
    [EmployeeName]  NVARCHAR (MAX) NOT NULL,
    [Department]    NVARCHAR (MAX) NULL,
    [DateOfJoining] NVARCHAR (MAX) NULL,
    [Salary]        INT            NOT NULL,
    [DateOfBirth] NVARCHAR(MAX) NULL, 
    CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED ([EmployeeID] ASC)
);

