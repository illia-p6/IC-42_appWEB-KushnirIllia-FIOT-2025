
USE HomeDecorDB;
GO
CREATE TABLE Roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);
GO
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE()
);
GO
CREATE TABLE UserRoles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    CONSTRAINT FK_UserRoles_Users
        FOREIGN KEY (user_id) REFERENCES Users(id)
        ON DELETE CASCADE,
    CONSTRAINT FK_UserRoles_Roles
        FOREIGN KEY (role_id) REFERENCES Roles(id)
        ON DELETE CASCADE
);
GO
CREATE TABLE Categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);
GO
CREATE TABLE Products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    category_id INT NOT NULL,
    CONSTRAINT FK_Products_Categories
        FOREIGN KEY (category_id) REFERENCES Categories(id)
        ON DELETE CASCADE
);
GO
INSERT INTO Roles (name) VALUES
('guest'),
('user'),
('admin');
GO
INSERT INTO Users (email, password_hash) VALUES
('admin@homedecor.ua', 'hashed_admin'),
('user@homedecor.ua', 'hashed_user');
GO
INSERT INTO UserRoles (user_id, role_id) VALUES
(1, 3), -- admin
(2, 2); -- user
GO
INSERT INTO Categories (name) VALUES
('Свічки'),
('Текстиль'),
('Декор');
GO
INSERT INTO Products (name, price, category_id) VALUES
('Ароматична свічка', 450.00, 1),
('Плед вʼязаний', 980.00, 2),
('Декоративна ваза', 530.00, 3);
GO
SELECT u.email, r.name AS role
FROM Users u
JOIN UserRoles ur ON u.id = ur.user_id
JOIN Roles r ON r.id = ur.role_id;
SELECT p.name, p.price, c.name AS category
FROM Products p
JOIN Categories c ON p.category_id = c.id;
SELECT c.name, COUNT(p.id) AS product_count
FROM Categories c
LEFT JOIN Products p ON p.category_id = c.id
GROUP BY c.name;
 
