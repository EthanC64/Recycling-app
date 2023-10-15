DROP DATABASE IF EXISTS trashapp_db;
CREATE DATABASE trashapp_db;
USE trashapp_db;
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255),
    comment TEXT,
    date DATE,
    title VARCHAR(255)
);