-- File: schema.sql
-- Info: Contains the structure of our database

-- First, let's delete the database if it already exists
-- USE DATABASE IF EXISTS employee_db;
-- DROP TABLE IF EXISTS employee;
-- DROP TABLE IF EXISTS role;
-- DROP TABLE IF EXISTS department;
DROP DATABASE IF EXISTS employee_db;

-- Next, create a fresh database.
CREATE DATABASE employee_db;
USE DATABASE employee_db;

-- Let's create our tables
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
)

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(6,2) NOT NULL,   -- six figures to the left, two figures to the right
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
)

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
)
