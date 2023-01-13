-- File: db/procedures.sql
-- Info: This file creates a list of stored procedures which we can use
-- NOTE: Procetures ace called `CALL procedureName()`
-- NOTE: Other procedures were added. We don't need them, but they complete the app.
USE DATABASE employee_db;

DELIMITER //

CREATE PROCEDURE viewAllDepartments()
BEGIN
    SELECT * FROM [All Departments];
END

CREATE PROCEDURE viewAllRoles()
BEGIN
    SELECT * FROM [All Roles];
END

CREATE PROCEDURE viewAllEmployees()
BEGIN
    SELECT * FROM [All Employees];
END

CREATE PROCEDURE viewAllRolesWithDepartments()
BEGIN
    SELECT * FROM [All Roles With Departments];
END

CREATE PROCEDURE viewAllEmployeesWithManagers()
BEGIN
    SELECT * FROM [All Employees With Managers];
END

CREATE PROCEDURE viewAllEmployeesBySalary()
BEGIN
    SELECT * FROM [All Employees By Salary];
END


-- Usage: CALL addDepartment()
CREATE PROCEDURE addDepartment(
    IN department_name VARCHAR(30)
)
BEGIN
    INSERT INTO department (name)
    VALUES (department_name);
END

-- Usage: CALL addRole()
CREATE PROCEDURE addRole(
    IN role_title VARCHAR(30),
    IN role_salary DECIMAL(6,2),
    IN role_department_id INT
)
BEGIN
    INSERT INTO role (title,salary,department_id)
    VALUES (role_title, role_salary, role_department_id);
END

-- Usage: CALL addEmployee()
CREATE PROCEDURE addEmployee(
    IN employee_first_name VARCHAR(30),
    IN employee_last_name VARCHAR(30),
    IN employee_role_id INT,
    IN employee_manager_id INT
)
BEGIN
    INSERT INTO employee (first_name,last_name,role_id,manager_id) 
    VALUES (employee_first_name, employee_last_name, employee_role_id, employee_manager_id);
END

CREATE PROCEDURE updateEmployeeName(
    IN employee_id INT,
    IN employee_first_name VARCHAR(30),
    IN employee_last_name VARCHAR(30),
)
BEGIN
    UPDATE employee
    SET first_name = employee_first_name, last_name = employee_last_name
    WHERE employee_id
END

-- Usage: CALL updateEmployeeRole()
CREATE PROCEDURE updateEmployeeRole(
    IN employee_id INT,
    IN employee_role_id INT
)
BEGIN
    UPDATE employee
    SET role_id = employee_role_id
    WHERE id = employee_id;
END

CREATE PROCEDURE updateEmployeeManager(
    IN employee_id INT,
    IN employee_manager_id
)
BEGIN
    UPDATE employee
    SET manager_id = employee_manager_id
    WHERE id = employee_id;
END

CREATE PROCEDURE deleteEmployee(
    IN employee_id INT
)
BEGIN
    DELETE FROM employee
    WHERE id = employee_id;
END

CREATE PROCEDURE deleteRole(
    IN role_id INT
)
BEGIN
    DELETE FROM role
    WHERE id = role_id;
END

CREATE PROCEDURE deleteDepartment(
    IN department_id INT
)
BEGIN
    DELETE FROM role
    WHERE id = role_id INT;
END

DELIMITER ;