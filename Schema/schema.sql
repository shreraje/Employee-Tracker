-- Drops the employee_tracker_db if it exists currently --
DROP DATABASE IF EXISTS employee_tracker_db;

-- Creates the "employee_tracker_db" database --
CREATE DATABASE employee_tracker_db;

-- Makes it so all of the following code will affect employee_tracker_db --
USE employee_tracker_db;

-- Creates the table "department" within employee_tracker_db --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Creates the table "employee" within employee_tracker_db --
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

-- Creates the table "role" within employee_tracker_db --
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT(30),
    PRIMARY KEY (id)
);