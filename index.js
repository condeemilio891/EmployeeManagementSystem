var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password change this when you need to
    password: "@SEwasd17",
    database: "EMPLOYEE_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch()
});

function runSearch() {
    inquirer
        .prompt({
            name: 'view',
            type: 'rawlist',
            message: "What would you like to do?",
            choices: [
                "view all employees",
                "view departments",
                'view roles',
                "view employees by manager", //need to add
                "add employee",
                "add department",
                'add role', 
                "update employee manager",
                "update employee role",
                "Delete employee",
                "Delete department",
                "Delete role",
                "view budget", //need to add
                "exit"
            ]

        })
        .then(function (answer) {
            console.log('Hello Welcome to the content-management system')
            switch (answer.view) {
                case "view all employees":
                    console.log('Here is a list of employees')
                    employeeshow();
                    break;

                case "view departments":
                    console.log("Showing Department")
                    departmentshow();
                    break;
                case "view roles":
                    console.log("Roles")
                    roleshow();
                    break;
                case "view employees by manager":
                    console.log('viewing employees by manager')
                    viewEmployeesByManager();
                    break;
                case "add employee":
                    console.log("add employee")
                    employeeAdd();
                    break;
                case "add department":
                    console.log("add department")
                    departmentRun();
                    break
                case "add role":
                    console.log("add role")
                    roleadd();
                    break
                case "update employee manager":
                    console.log("update employee manager")
                    updateEmployeeManager();
                    break
                case "update employee role":
                    console.log("update employee roles")
                    updateEmployeeRole();
                    break

                case "Delete employee":
                    console.log("deleting department");
                    deleteEmployee();
                    break
                case "Delete department":
                    console.log('deleting department');
                    deleteDepartment();
                    break
                case "Delete role":
                    console.log('deleting role');
                    deleteRole();
                case "exit":
                    connection.end();
                    break;
            }

        });
}
// show all employees, department and roles
function employeeshow() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("Above is a list of employees.")
        // here I will ask if they wish to exit
        inquirer
            .prompt({
                name: 'exit',
                type: 'list',
                message: "Would you like to continue?",
                choices: [
                    "yes",
                    "no"]
            })
            .then(function (data) {
                switch (data.exit) {
                    case "yes":
                        runSearch()
                        break
                    case "no":
                        connection.end();
                }
            })
    })
}

function departmentshow() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("above is a list of departments")
        inquirer
            .prompt({
                name: 'exit',
                type: 'list',
                message: "Would you like to continue?",
                choices: [
                    "yes",
                    "no"]
            })
            .then(function (data) {
                switch (data.exit) {
                    case "yes":
                        runSearch()
                        break
                    case "no":
                        connection.end();
                }
            })
    })
}

function roleshow() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res);
        console.log("above is a list of employee roles")
        inquirer
            .prompt({
                name: 'exit',
                type: 'list',
                message: "Would you like to continue?",
                choices: [
                    "yes",
                    "no"]
            })
            .then(function (data) {
                switch (data.exit) {
                    case "yes":
                        runSearch()
                        break
                    case "no":
                        connection.end();
                }
            })
    })
}
///view employees by manager

function viewEmployeesByManager() {
    inquirer.prompt(
        {
            name: "manager",
            type: "input",
            message: "enter manager id"
        }
    ).then(function (answer) {
        connection.query
            ("SELECT * FROM employees WHERE manager_id",
                {
                    manager_id: answer.manager
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res)
                }

            )
    })


}
// add employee funciton 
function employeeAdd() {
    inquirer
        .prompt([
            {
                name: "addID",
                type: "input",
                message: "insert employee id"
            },
            {
                name: "addT",
                type: "input",
                message: "insert employee title"
            },
            {
                name: "addS",
                type: "input",
                message: "insert employee salary"
            },
            {
                name: "addroleid",
                type: "input",
                message: "insert employee role id"
            },
            {
                name: "addMID",
                type: "input",
                message: "insert manger ID for the employeee"
            }]

        )
        .then(function (answer) {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    id: answer.addID,
                    title: answer.addT,
                    salary: answer.addS,
                    role_id: answer.addroleid,
                    manager_id: answer.addMID,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your employee was created!\n");
                    inquirer
                        .prompt({
                            name: 'exit',
                            type: 'list',
                            message: "Would you like to continue?",
                            choices: [
                                "yes",
                                "no"]
                        })
                        .then(function (data) {
                            switch (data.exit) {
                                case "yes":
                                    runSearch()
                                    break
                                case "no":
                                    connection.end();
                            }
                        })
                }

            )
        })

}

//department add 
function departmentRun() {
    inquirer
        .prompt([{
            name: "addD",
            type: "input",
            message: "Insert name of department you would like to add"
        },
        {
            name: "addDID",
            type: "input",
            message: "insert ID"
        }])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    namee: answer.addD,
                    id: answer.addDID

                },
                function (err) {
                    if (err) throw err;
                    console.log("department created!/n")
                    inquirer
                        .prompt({
                            name: 'exit',
                            type: 'list',
                            message: "Would you like to continue?",
                            choices: [
                                "yes",
                                "no"]
                        })
                        .then(function (data) {
                            switch (data.exit) {
                                case "yes":
                                    runSearch()
                                    break
                                case "no":
                                    connection.end();
                            }
                        })
                }
            )
        })
}

//Role add 
function roleadd() {
    inquirer
        .prompt([{
            name: "AddRID",
            type: "input",
            message: "add ID"
        },
        {
            name: "addRT",
            type: "input",
            message: "add title"
        },
        {
            name: "addRS",
            type: "input",
            message: "add salary"
        },
        {
            name: "add",
            type: "input",
            message: "add department ID"
        },


        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    id: answer.addRID,
                    title: answer.addRT,
                    salary: answer.addRS,
                    department_id: answer.add,

                },
                function (err) {
                    if (err) throw err;
                    console.log("new role was created!\n");
                    inquirer
                        .prompt({
                            name: 'exit',
                            type: 'list',
                            message: "Would you like to continue?",
                            choices: [
                                "yes",
                                "no"]
                        })
                        .then(function (data) {
                            switch (data.exit) {
                                case "yes":
                                    runSearch()
                                    break
                                case "no":
                                    connection.end();
                            }
                        })
                }
            )
        })
}
// function to update employee 
function employeeUpdate() {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log("Updating employee...\n")
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "enter the id of the employee you would like to change"
            },
            {
                name: "title",
                type: "input",
                message: "enter the new name"
            }, {
                name: "salary"
                , type: "input",
                message: "enter new salary"
            }, {
                name: "role_id",
                type: "input",
                message: "enter new role id"
            }
        ]).then(function (answer) {
            connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        title: answer.title,
                        salary: answer.salary,
                        role_id: answer.role_id,

                    },
                    {
                        id: answer.id
                    },
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log('employee updated\n');
                    inquirer
                        .prompt({
                            name: 'exit',
                            type: 'list',
                            message: "Would you like to continue?",
                            choices: [
                                "yes",
                                "no"]
                        })
                        .then(function (data) {
                            switch (data.exit) {
                                case "yes":
                                    runSearch()
                                    break
                                case "no":
                                    connection.end();
                            }
                        });
                }
            )
        })
}

// function to update employees ==
function updateEmployeeRole() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log("Updating employee roles...\n");
    inquirer.prompt([
        {
            name: "employee",
            type: "input",
            message: "enter ID of the role you would like to change"

        },
        {
            name: "newemployee",
            type: "input",
            message: "Enter new title"

        },
        {
            name: 'newSalary',
            type: "input",
            message: "enter new salary amount"
        },
        {
            name: "newDepartmentId",
            type: "input",
            message: "input new department identification number"
        }
    ]).then(function (answer) {
        connection.query(
            "UPDATE roles SET ? WHERE ?",
            [
                {
                    title: answer.newemployee,
                    salary: answer.newSalary,
                    department_id: answer.newDepartmentId
                },
                {
                    id: answer.employee
                },


            ],
            function (err, res) {
                if (err) throw err;
                console.log("Roles updated\n");
                inquirer
                    .prompt({
                        name: 'exit',
                        type: 'list',
                        message: "Would you like to continue?",
                        choices: [
                            "yes",
                            "no"]
                    })
                    .then(function (data) {
                        switch (data.exit) {
                            case "yes":
                                runSearch()
                                break
                            case "no":
                                connection.end();
                        }
                    });
            }
        )
    })
}

function updateEmployeeManager() {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log("updating employee manager...\n")
    inquirer
        .prompt([
            {
                name: "employeeId",
                type: "input",
                message: "Enter Employee ID"

            },
            {
                name: "newManager",
                type: "input",
                message: "Enter new manager ID"
            }
        ]).then(function (answer) {
            connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        manager_id: answer.newManager
                    },
                    {
                        id: answer.employeeId

                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    console.log("manager ID updated for employee...\n");
                    inquirer
                        .prompt({
                            name: 'exit',
                            type: 'list',
                            message: "Would you like to continue?",
                            choices: [
                                "yes",
                                "no"]
                        })
                        .then(function (data) {
                            switch (data.exit) {
                                case "yes":
                                    runSearch()
                                    break
                                case "no":
                                    connection.end();
                            }
                        });
                }
            )
        })
}



//Delete employee
function deleteEmployee() {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log("deleting employees...\n");
    inquirer.prompt(
        {
            name: "id",
            type: "input",
            message: "Enter Employee ID"
        }
    ).then(function (answer) {
        connection.query(
            "DELETE FROM employees WHERE ?",
            { id: answer.id },
            function (err, res) {
                if (err) throw err;
                console.log("Employee removed\n");
                inquirer
                    .prompt({
                        name: 'exit',
                        type: 'list',
                        message: "Would you like to continue?",
                        choices: [
                            "yes",
                            "no"]
                    })
                    .then(function (data) {
                        switch (data.exit) {
                            case "yes":
                                runSearch()
                                break
                            case "no":
                                connection.end();
                        }
                    });
            }
        )
    })
}
//delete department function
function deleteDepartment() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log('deleting department....\n');
    inquirer.prompt(
        {
            name: "id",
            type: 'input',
            message: "Enter department id"
        }
    ).then(function (answer) {
        connection.query(
            "DELETE FROM department WHERE ?",
            { id: answer.id },
            function (err, res) {
                if (err) throw err;
                console.log('department removed..\n');
                inquirer
                    .prompt({
                        name: 'exit',
                        type: 'list',
                        message: "Would you like to continue?",
                        choices: [
                            "yes",
                            "no"]
                    })
                    .then(function (data) {
                        switch (data.exit) {
                            case "yes":
                                runSearch()
                                break
                            case "no":
                                connection.end();
                        }
                    });
            }
        )
    })
}
//function to delete role
function deleteRole() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log("deleting role...\n");
    inquirer.prompt(
        {
            name: "id",
            type: "input",
            message: "Enter ID"
        }
    ).then(function (answer) {
        connection.query(
            "DELETE FROM roles WHERE ?",
            { id: answer.id },
            function (err, res) {
                if (err) throw err;
                console.log("Role removed...\n");
                inquirer
                    .prompt({
                        name: 'exit',
                        type: 'list',
                        message: "Would you like to continue?",
                        choices: [
                            "yes",
                            "no"]
                    })
                    .then(function (data) {
                        switch (data.exit) {
                            case "yes":
                                runSearch()
                                break
                            case "no":
                                connection.end();
                        }
                    });
            }
        )
    })
}