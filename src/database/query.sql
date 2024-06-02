CREATE DATABASE playstation;

USE playstation;

CREATE TABLE juegos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    GAME VARCHAR(50),
    CONSOLE VARCHAR(50),
    PUBLISHER VARCHAR(50),
    RELEASE_DATE INT,
    PEGI_INFO VARCHAR(50)
);

SELECT * FROM playstation;

CREATE USER 'sony'@'localhost' IDENTIFIED BY 'sony';
GRANT ALL PRIVILEGES ON playstation.* TO 'sony'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'sony'@'localhost';