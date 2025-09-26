CREATE TABLE Departments (
DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
DepartmentCode NVARCHAR(50) NOT NULL UNIQUE,
DepartmentName NVARCHAR(150) NOT NULL,
CreatedAt DATETIME DEFAULT GETUTCDATE(),
UpdatedAt DATETIME NULL
);


CREATE TABLE Employees (
EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
FirstName NVARCHAR(100) NOT NULL,
LastName NVARCHAR(100) NOT NULL,
Email NVARCHAR(256) NOT NULL,
DateOfBirth DATE NOT NULL,
Salary DECIMAL(18,2) NOT NULL,
DepartmentId INT NOT NULL,
CreatedAt DATETIME DEFAULT GETUTCDATE(),
UpdatedAt DATETIME NULL,
CONSTRAINT FK_Employees_Departments FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
);


-- Optional indexes
CREATE INDEX IX_Employees_Email ON Employees(Email);
CREATE INDEX IX_Employees_DepartmentId ON Employees(DepartmentId);



-- Insert Departments
INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES 
('HR', 'Human Resources'),
('IT', 'Information Technology');

-- Insert Employees
INSERT INTO Employees (FirstName, LastName, Email, DateOfBirth, Salary, DepartmentId)
VALUES
('John', 'Doe', 'john.doe@example.com', '1990-05-12', 55000.00, 1),
('Jane', 'Smith', 'jane.smith@example.com', '1988-11-23', 60000.00, 2),
('Michael', 'Johnson', 'michael.johnson@example.com', '1992-07-08', 52000.00, 1),
('Emily', 'Davis', 'emily.davis@example.com', '1995-03-19', 48000.00, 2),
('William', 'Brown', 'william.brown@example.com', '1985-09-02', 75000.00, 1),
('Olivia', 'Wilson', 'olivia.wilson@example.com', '1993-12-15', 50000.00, 2),
('James', 'Taylor', 'james.taylor@example.com', '1991-06-21', 61000.00, 1),
('Sophia', 'Anderson', 'sophia.anderson@example.com', '1994-01-30', 47000.00, 2),
('Daniel', 'Thomas', 'daniel.thomas@example.com', '1989-08-10', 58000.00, 1),
('Ava', 'Martinez', 'ava.martinez@example.com', '1996-04-05', 49000.00, 2);


