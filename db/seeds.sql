-- File: db/seeds.sql
-- Info: Some data to stick into our tables.
-- NOTE: You MUST run db/schema.sql before using this file!

INSERT INTO department (name) VALUES (
    -- TODO: Make up something, and probably determine what the ids are, starting at 1.
)
INSERT INTO role (title, salary, department_id) VALUES (
    -- TODO: Make up something, and probably determine what the ids are starting at 1.
    -- TODO: Use the ids in department to fill in the blanks for department_id.
)

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (
    -- TODO: Make up something, and probably determine what the ids are starting at 1.
    -- TODO: You should insert the manager employees before inserting their subordinates.
    -- TODO: Use the ids in role to fill in the blanks for role_id.
    -- TODO: Use the ids of manager employees to fill in the blanks for manager_id.
)
