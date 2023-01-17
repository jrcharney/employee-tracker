/**
 * @file index.js
 * @author jrcharney@gmail.com)
 * @desc Employee Tracker
 * @note some assets from team-profile-generator were used.
 */

import inquirer from "inquirer";
import { conn } from "./app/conn.js";

function mainMenu(){
    inquirer.prompt({
        "name" : "task",
        "type" : "list",
        "message": "What would you like to do?",
        "choices": [
            {
                "name": "View",
                "value": "view"
            },
            {
                "name": "Add",
                "value": "add"
            },
            {
                "name": "Update",
                "value": "update"
            },
            {
                "name": "Delete",
                "value": "delete"
            },
            new inquirer.Separator(),
            {
                "name": "Exit",
                "value": "exit"
            }
        ],
        "loop": "false"
    }).then((answers) => {
        const tasks = {
            "view"   : viewMenu,
            "add"    : addMenu,
            "update" : updateMenu,
            "delete" : deleteMenu,
            "exit"   : exitProgram
        };
        return tasks[answers.task]();
    });
};

/* ## Common Queries
 * I wanted to show these as PROCEDURES in SQL. This should be the next best thing.
 */
async function findAllQuery(table){
    return await conn.query(`SELECT * FROM ${table}`);
}
async function findOneQuery(table,id,field){
    return await conn.query(`SELECT ${field} FROM ${table} WHERE id = ?`,[id]);
}
async function updateQuery(table,id,field,value){
    return await conn.query(`UPDATE ${table} SET ${field} = ? WHERE id = ?`,[value,id]);
}
async function deleteQuery(table,id){
    return await conn.query(`DELETE FROM ${table} WHERE id=${id}`);
}

/* ## LIST Menu Methods 
 * List queries should be ordered by alphanumeric value for aesthetic reasons.
 * To ensure that our data is preserved, the id of each record is also included.
 */

// TODO: List Departments as a menu
async function listDepartments(){
    await conn.query(`SELECT id, name FROM departments ORDER BY name ASC`).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: row.name };
        });
    });
}

// TODO: List Roles as a menu
async function listRoles(){
    await conn.query(`SELECT id, job_title FROM role ORDER BY job_title ASC`).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: row.name };
        });
    });
}

// TODO: List Roles in a Department as a menu
// INNER JOIN department ON role.department_id = department.id      // Note: I'm just setting this here. It will be useful later.
async function listRolesInDepartment(department_id){
    await conn.query(`SELECT id, job_title FROM role WHERE role.department_id = ? ORDER BY job_title ASC`,[department_id]).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: row.name };
        });
    });
}

// TODO: List Employees as a menu
async function listEmployees(){
    await conn.query(`SELECT id, first_name, last_name FROM employee ORDER BY last_name ASC, first_name ASC`).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: `${row.first_name} ${row.last_name}` };
        });
    });
}

// TODO: List Managers as a menu (filtered employees)
async function listManagers(){
    await conn.query(`SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL ORDER BY last_name ASC, first_name ASC`).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: `${row.first_name} ${row.last_name}` };
        });
    });
};

async function listNonManagers(){
    await conn.query(`SELECT id, first_name, last_name FROM employee WHERE manager_id IS NOT NULL ORDER BY last_name ASC, first_name ASC`).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: `${row.first_name} ${row.last_name}` };
        });
    });
}

// TODO: List Employees with a role
async function listEmployeesByRole(role_id){
    await conn.query(`SELECT id, first_name, last_name FROM employee WHERE role_id = ? ORDER BY last_name ASC, first_name ASC`,[role_id]).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: `${row.first_name} ${row.last_name}` };
        });
    });
}

// TODO: List Employees in a department
async function listEmployeesByDepartment(department_id){
    await conn.query(`SELECT id, first_name, last_name FROM employee WHERE department_id = ? ORDER BY last_name ASC, first_name ASC`,[department_id]).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: `${row.first_name} ${row.last_name}` };
        });
    });
}

// TODO: List Employees with a role in a department
async function listEmployeesByRoleAndDepartment(role_id,department_id){
    await conn.query(`SELECT id, first_name, last_name FROM employee WHERE role_id = ? AND department_id = ? ORDER BY last_name ASC, first_name ASC`,[role_id,department_id]).then((rows) => {
        return rows.map((row) => {
            return { id: row.id, name: `${row.first_name} ${row.last_name}` };
        });
    });
}

/**
 * @method viewMenu
 * @desc Our readable tasks. The R in CRUD.
 * @todo Add more view methods here
 */
function viewMenu(){
    inquirer.prompt({
        "name" : "task",
        "type" : "list",
        "message": "What would you like to see?",
        "choices" : [
            {
                "name" : "View All Departments",
                "value" : "allDepartments"
            },
            {
                "name" : "View All Roles",
                "value" : "allRoles"
            },
            {
                "name" : "View All Employees",
                "value" : "allEmployees"
            },
            new inquirer.Separator(),
            {
                "name": "Cancel",
                "value": "mainMenu"
            },
            // TODO: add more items here
            /*
            {
                "name" : "",
                "value" : ""
            },
            */
        ],
        "loop": false
    }).then((answers) => {
        const tasks = {
            "allDepartments" : viewAllDepartments,
            "allRoles" : viewAllRoles,
            "allEmployees" : viewAllEmployees,
            "mainMenu" : mainMenu
            // TODO: List all Managers
            // TODO: add more methods
        };
        return tasks[answers.task]();
        // TODO: console.table here?
    });
}

/**
 * @method addMenu
 * @desc Our creatable tasks. The C in CRUD.
 */
function addMenu(){
    inquirer.prompt({
        "name" : "task",
        "type" : "list",
        "message": "What would you like to add?",
        "choices" : [
            {
                "name" : "New Department",
                "value" : "newDepartment"
            },
            {
                "name" : "New Role",
                "value" : "newRole"
            },
            {
                "name" : "New Employee",
                "value" : "newEmployee"
            },
            new inquirer.Separator(),
            {
                "name": "Cancel",
                "value": "mainMenu"
            }
        ],
        "loop": false
    }).then((answers) => {
        const tasks = {
            "newDepartments" : newDepartment,
            "newRole" : newRole,
            "newEmployee" : newEmployee,
            "mainMenu": mainMenu
        };
        return tasks[answers.task]();
    });
}

/**
 * @method updateMenu
 * @desc Our updatable tasks. The U in CRUD.
 */
function updateMenu(){
    inquirer.prompt({
        "name" : "task",
        "type" : "list",
        "message": "What would you like to update?",
        "choices" : [
            {
                "name" : "Update a Department",
                "value" : "updateDepartment"
            },
            {
                "name" : "Update a Role",
                "value" : "updateRole"
            },
            {
                "name" : "Update an Employee",
                "value" : "updateEmployee"
            },
            // TODO: add more items here
            /*
            {
                "name" : "",
                "value" : ""
            },
            */
            new inquirer.Separator(),
            {
                "name": "Cancel",
                "value": "mainMenu"
            }
        ],
        "loop": false
    }).then((answers) => {
        const tasks = {
            "updateDepartment" : updateDepartment,
            "updateRole" : updateRole,
            "updateEmployee" : updateEmployee,
            // TODO: add more methods
            "mainMenu" : mainMenu
        };
        return tasks[answers.task]();
    });
}

/**
 * @method deleteMenu
 * @desc Our deletable tasks. The D in CRUD.
 */
function deleteMenu(){
    inquirer.prompt({
        "name" : "task",
        "type" : "list",
        "message": "What would you like to remove?",
        "choices" : [
            {
                "name" : "A Department",
                "value" : "deleteDepartment"
            },
            {
                "name" : "A Role",
                "value" : "deleteRole"
            },
            {
                "name" : "An Employee",
                "value" : "deleteEmployee"
            },
            new inquirer.Separator(),
            {
                "name": "Cancel",
                "value": "mainMenu"
            }
        ],
        "loop": false
    }).then((answers) => {
        const tasks = {
            "newDepartments" : deleteDepartment,
            "newRole" : deleteRole,
            "newEmployee" : deleteEmployee,
            "mainMenu": mainMenu
        };
        return tasks[answers.task]();
    });
}

/* ## VIEW menu */

/**
 * @method viewAllDepartments
 * @desc List all the departments in the database
 */
async function viewAllDepartments(){
    /*
    conn.query(`SELECT * FROM department`, (err,data) => {
        if(err) throw err;
        console.table(data);
        mainMenu();
    });
    */
    await findAllQuery("department").then((rows) => {
        console.table(rows);    
    });     // .catch()     // TODO: Add a catch later
    mainMenu();
}

/**
 * @method viewAllRoles
 * @desc 
 */
async function viewAllRoles(){
    /*
    conn.query(`SELECT * FROM role`, (err,data) => {
        if(err) throw err;
        console.table(data);
        mainMenu();
    });
    */
    await findAllQuery("role").then((rows) => {
        console.table(rows);    
    });     // .catch()     // TODO: Add a catch later
    mainMenu();
}

async function viewAllEmployees(){
    // TODO: we should list who their managers are
    /*
    conn.query(`SELECT * FROM employee`, (err,data) => {
        if(err) throw err;
        console.table(data);
        mainMenu();
    });
    */
    await findAllQuery("employee").then((rows) => {
        console.table(rows);    
    });     // .catch()     // TODO: Add a catch later
    mainMenu();
}
// TODO: Add more view methods

/* ## ADD Menu */
// TODO: await conn, this function should be async
function addDepartment(){
    inquirer.prompt([{
        "name": "name",
        "type": "input",
        "message": "What should we call this department?"
        // TODO: Validate this later!
    }]).then((answers) => {
        conn.query(`INSERT INTO department (name) VALUES (?)`, [answers.name]);
        console.log(`New Department "${answers.name}" added!`);
        mainMenu();
    });
}

// TODO: Make sure job_title is used elsewhere
// TODO: await conn, this function should be async
function addRole(){
    inquirer.prompt([
        {
            "name": "job_title",
            "type": "input",
            "message": "What should we call this role?"
            // TODO: Validate this later!
        },
        {
            "name": "salary",
            "type": "number",
            "message": "How much does it pay per year?"
            // TODO: Validate this later!
        },
        {
            "name": "department_id",
            "type": "input",                                // TODO: Change to a list of choices later
            "message": "In what department is this role?"
            // TODO: Validate this later!
        }
    ]).then((answers) => {
        conn.query(`INSERT INTO role (job_title,salary,department_id) VALUES (?, ?, ?)`, [answers.job_title,answers.salary,answers.department_id]);
        console.log(`New Role "${answers.job_title}" added!`);
        mainMenu();
    });
}

// TODO: await conn, this function should be async
function addEmployee(){
    inquirer.prompt([
        {
            "name": "first_name",
            "type": "input",
            "message": "What is their first name?"
            // TODO: Validate this later!
        },
        {
            "name": "last_name",
            "type": "input",
            "message": "What is their last name?"
            // TODO: Validate this later!
        },
        {
            "name": "role_id",
            "type": "input",                            // TODO: change to a list of choices later
            "message": "What is their job?"
            // TODO: Validate this later!
        },
        {
            "name": "has_manager",
            "type": "input",                            // TODO: Radio buttons
            "message": "Do they have a manager?"
            // TODO: Validate this later!
        },
        {
            "name": "manager_id",
            "type": "input",
            "message": "Who is their?"                  // TODO: change to a list of choices later
            // TODO: Validate this later!
        }
    ]).then((answers) => {
        // TODO: Have two queries, one for if they don't have a manager and one of if they do
        conn.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?, ?, ?, ?)`, [answers.first_name,answers.last_name,answers.role_id,answers.manager_id]);
        console.log(`New Employee "${answers.first_name} ${answers.last_name}" added!`);
        mainMenu();
    });
}

/* ## UPDATE Menu */

// TODO: better define update methods
// TODO: have updateDepartment have an id argument
// TODO: await conn, this function should be async
function updateDepartment(){
    inquirer.prompt([
        {
            "name": "id",
            "type": "input",            // TODO: Change to a list of choices later
            "message": "Which department would you like to update?"
        }
    ]).then((answers) => {
        findOneQuery("department",answers.id,"name").then((rows) => {
            const oldName = rows[0].name;       // I assume that's what it's called.
            console.log(oldName);               // Delete this later
            updateQuery("department",answers.id,"name",answers.name);
            console.log(`Department "${oldName}" is now "${answers.name}"`);    
        });     // .catch()     // TODO: Add a catch later
        mainMenu();
    });
}

//function updateDepartmentName(){}

// TODO: await conn, this function should be async
function updateRole(){
    inquirer.prompt([
        {
            "name": "id",
            "type": "input",            // TODO: Change to a list of choices later
            "message": "Which role would you like to update?"
        },
        {
            "name": "task",
            "type": "list",
            "message": "What would you like th change in this role?",
            "choices": [
                {
                    "name": "The job title",
                    "value": "jobTitle"
                },
                {
                    "name": "The salary",
                    "value": "salary"
                },
                {
                    "name": "The department",
                    "value": "department"
                }
            ]
        }
    ]).then((answers) => {
        const tasks = {
            "jobTitle" : updateRoleJobTitle,
            "salary"   : updateRoleSalary,
            "department" : updateRoleDepartment
        };
        tasks[answers.task](answers.id);
    });
}

// TODO: await conn, this function should be async
function updateRoleJobTitle(id){
    inquirer.prompt([
        {
            "name" : "job_title",
            "type" : "input",
            "message" : "What should we call this job?"
            // TODO: Validate later
        }
    ]).then((answers) => {
        findOneQuery("role",id,"job_title").then((rows) => {
            const oldJobTitle = rows[0].job_title;       // I assume that's what it's called.
            console.log(oldJobTitle);               // Delete this later
            updateQuery("role",id,"job_title",answers.job_title);
            console.log(`Department "${oldJobTitle}" is now "${answers.jobTitle}"`);    
        });     // .catch()     // TODO: Add a catch later
        mainMenu();
    });
}

// TODO: await conn, this function should be async
function updateRoleSalary(id){
    inquirer.prompt([
        {
            "name" : "salary",
            "type" : "number",
            "message" : "What is the new salary (per year)?"
            // TODO: Validate later
        }
    ]).then((answers) => {
        findOneQuery("role",id,"salary").then((rows) => {
            const oldSalary = rows[0].salary;       // I assume that's what it's called.
            console.log(oldSalary);               // Delete this later
            updateQuery("role",id,"salary",answers.salary);
            console.log(`Department "${oldSalary}" is now "${answers.salary}"`);    
        });     // .catch()     // TODO: Add a catch later
        mainMenu();
    });
}

// TODO: await conn, this function should be async
function updateRoleDepartment(id){
    inquirer.prompt([
        {
            "name" : "department_id",
            "type" : "input",               // TODO: change to a list of choices
            "message" : "Where should we move this department?"
            // TODO: Validate later
        }
    ]).then((answers) => {
        findOneQuery("role",id,"department_id").then((rows) => {
            const oldDeptId = rows[0].department_id;       // I assume that's what it's called.
            console.log(oldDeptId);               // Delete this later
            updateQuery("role",id,"department_id",answers.department_id);
            console.log(`Department "${oldDeptId}" is now "${answers.department_id}"`);    
        });     // .catch()     // TODO: Add a catch later
        mainMenu();
    });
}

// TODO: await conn, this function should be async
function updateEmployee(){
    inquirer.prompt([
        {
            "name": "id",
            "type": "input",            // TODO: Change to a list of choices later
            "message": "Which role would you like to update?"
        },
        {
            "name": "task",
            "type": "list",
            "message": "What would you like to change about this employee?",
            "choices": [
                {
                    "name": "Their name",
                    "value": "name"
                },
                {
                    "name": "Their role",
                    "value": "role_id"
                },
                {
                    "name": "Their manager",
                    "value": "manager_id"
                }
            ]
        }
    ]).then((answers) => {
        const tasks = {
            "name" : updateEmployeeName,
            "role_id"   : updateEmployeeRole,
            "manager_id" : updateEmployeeManager
        };
        tasks[answers.task](answers.id);
    });
}

// TODO: await conn, this function should be async
function updateEmployeeName(id){
    inquirer.prompt([
        {
            "name" : "first_name",
            "type" : "input",
            "message" : "What is their new first name?"
            // TODO: Validate later
        },
        {
            "name" : "last_name",
            "type" : "input",
            "message" : "What is their new last name?"
            // TODO: Validate later
        }
    ]).then((answers) => {
        conn.query(`SELECT first_name, last_name FROM employee WHERE id = ?`,[id]).then((rows) => {
            const {first_name, last_name} = rows[0];       // I assume that's what it's called.
            console.log(oldJobTitle);               // Delete this later
            conn.query(`UPDATE employee SET first_name = ?, last_name = ? WHERE id = ?`,[answers.first_name,answers.last_name,id]);
            console.log(`Employee "${first_name} ${last_name}" is now know as "${answers.first_name} ${answers.last_name}".`);    
        });     // .catch()     // TODO: Add a catch later
        mainMenu();
    });
}

// TODO: await conn, this function should be async
function updateEmployeeRole(id){
    inquirer.prompt([
        {
            "name" : "role_id",
            "type" : "input",                       // TODO: replace this with a list of choices
            "message" : "What should their new role be?"
            // TODO: Validate later
        }
    ]).then((answers) => {
        findOneQuery("employee",id,"role_id").then((rows) => {
            const oldRoleId = rows[0].role_id;       // I assume that's what it's called.
            console.log(oldRoleId);               // Delete this later
            updateQuery("employee",id,"role_id",answers.role_id);
            // TODO: Include employee's name
            // TODO: replace role ids with job titles
            console.log(`Employee role "${oldRoleId}" is now "${answers.role_id}"`);    
        });     // .catch()     // TODO: Add a catch later
        mainMenu();
    });
}

// TODO: await conn, this function should be async
function updateEmployeeManager(id){
    inquirer.prompt([
        {
            "name" : "manager_id",
            "type" : "input",                       // TODO: replace this with a list of choices
            "message" : "What should their new role be?"
            // TODO: Validate later
        }
    ]).then((answers) => {
        findOneQuery("employee",id,"manager_id").then((rows) => {
            const oldManagerId = rows[0].manager_id;       // I assume that's what it's called.
            console.log(oldManagerId);               // Delete this later
            updateQuery("employee",id,"manager_id",answers.manager_id);
            // TODO: Include employee's name
            // TODO: replace manager ids with first and last names
            console.log(`Employee manager "${oldRoleId}" is now "${answers.manager_id}"`);    
        });     // .catch()     // TODO: Add a catch later
        mainMenu();
    });
}

/* ## DELETE Menu */

// TODO: We can probably factor this out
// TODO: await conn, this function should be async
function deleteDepartment(){
    inquirer.prompt([
        {
            "type" : "input",
            "name" : "id",
            "message": "Enter the department ID"
        }
    ]).then((answers) => {
        deleteQuery("department",answers.id);
    });
}

// TODO: We can probably factor this out
// TODO: await conn, this function should be async
function deleteRole(){
    inquirer.prompt([
        {
            "type" : "input",
            "name" : "id",
            "message": "Enter the role ID"
        }
    ]).then((answers) => {
        deleteQuery("role",answers.id);
    });
}

// TODO: We can probably factor this out
// TODO: await conn, this function should be async
function deleteEmployee(){
    inquirer.prompt([
        {
            "type" : "input",
            "name" : "id",
            "message": "Enter the employee ID"
        }
    ]).then((answers) => {
        deleteQuery("employee",answers.id);
    });
}

/* ## EXIT AND MAIN */

/**
 * @method exitProgram
 * @desc Ask the user if they would like to still use the program
 */
// TODO: await conn, this function should be async
function exitProgram(){
    inquirer.prompt([{
        "type": "confirm",
        "name": "exit",
        "message": "Are you sure you want to quit this program?",
        "default" : false,
        "loop": false
    }]).then((answers) => {
        if(answers.exit){
            conn.end();     // gracefully close the SQL connection
            console.log("Goodbye.");
            return 0;
        }else{
            return mainMenu();
        }
    });
}

/**
 * @method main
 * @description the main method
 */
// TODO: await conn, this function should be async
function main(){
    mainMenu();
}

main();