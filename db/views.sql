-- File: views.sql
-- Info: A list of view queries (simply called views)
-- Note: You MUST run db/schema.sql before using this file!
-- TODO: Pagnation!  Use LIMIT to set a limit as to how many items to view
--                  But what do we use to set as an offset?

-- View: allDepartments
-- Desc: Simple view of everything in the department table.
-- TODO: Probably should rename this table to departments.
CREATE VIEW [All Departments] AS
    SELECT *
    FROM department;

-- View: allRoles
-- Desc: Simple view of everything in the role table.
-- TODO: Probably should rename role to roles since role might be a keyword.
CREATE VIEW [All Roles] AS
    SELECT *
    FROM role;

-- View: allEmployees
-- Desc: Simple view of everything in the employee table.
-- TODO: Probably should rename this table to employees.
CREATE VIEW [All Employees] AS
    SELECT *
    FROM employee;

-- View: allRolesWithDepartments
-- Desc: A more advanced version of allRoles but with the department.name listed instead of department_id
CREATE VIEW [All Roles With Departments] AS
    SELECT  role.id AS "ID", 
            role.title AS "Job title", 
            LPAD(CONCAT("$",role.salary),7," ") AS "Salary",
            department.name AS "Department"
    FROM role
    INNER JOIN department ON role.department_id = department.id;

-- View: allEmployeesWithManagers
-- Desc: Like allEmployees but with the names of managers listed.
-- Note: There's a SELF JOIN in this one!
CREATE VIEW [All Employees With Managers] AS
    SELECT  employee.id AS "ID",
            CONCAT(employee.first_name," ",employee.last_name) AS "Name",
            role.title AS "Role",
            CONCAT(manager.first_name," ",manager.last_name) AS "Manager"
    FROM employee, employee manager
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN manager ON employee.manager_id = manager.id;

-- View: allEmployeesBySalary
-- Desc: View all employees by their wages (largest to smallest)
CREATE VIEW [All Employees By Salary] AS
    SELECT employee.id AS "ID",
    CONCAT(employee.first_name," ",employee.last_name) AS "Name",
    role.title AS "Role",
    LPAD(CONCAT("$",role.salary),7," ") AS "Salary"
    FROM employee, role
    INNER JOIN role ON employee.role_id = role.id
    ORDER BY role.salary DESC;

-- View Salary by department
-- Desc: View how much it cost to pay employees by department
-- TODO: Work on this later.
-- CREATE VIEW [All Departments By Salary] AS
--    SELECT department.name AS "Department",
--             COUNT(SELECT )