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
    if (!err)
    console.log('D.B. Connection Succeded') 
    else 
    console.log('DB connection failed \n Error:'+JSON.stringify(err,undefined,2));
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
                "view employees by manager", 
                "view employees by role",
                "add employee",
                "add department",
                'add role', 
                "update employee",
                "update department",
                "update role",
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
                case "view employees by role":
                    console.log('viewing employess by role')
                    viewEmployeesByRole();
                    break;
                case "add employee":
                    console.log("add employee")
                    employeeAdd();
                    break;
                case "add department":
                    console.log("add department")
                    departmentAdd();
                    break
                case "add role":
                    console.log("add role")
                    roleadd();
                    break
                case "update employee":
                    console.log('updating employee')
                    employeeUpdate();
                    break
                case "update department":
                    console.log("update employee manager")
                    updateDepartment();
                    break
                case "update role":
                    console.log("update employee roles")
                    updateRole();
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
// Below are all the functions as they pertain to each case
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
///view employees by manager and role
// by manager
function viewEmployeesByManager() {
    inquirer.prompt(
        {
            name: "manager",
            type: "input",
            message: "enter manager id"
        }
    ).then(function (answer) {
        connection.query
            ("SELECT * FROM employees WHERE ?",
                {
                    manager_id: answer.manager
                },
                function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    inquirer.prompt({
                        name:'exit',
                        type:"list",
                        message:'would you like to continue',
                        choices:[
                            "yes",
                            "no"

                        ]
                    }).then(function(data){
                        switch(data.exit){
                            case 'yes':
                                runSearch()
                                break 
                            case 'no':
                            connection.end()
                        }
                    })
                }

            )
    })


}
// view employee by role 
function viewEmployeesByRole(){
    inquirer.prompt({
        name:'viewrole',
        type:'input',
        message:"enter role id"
    }).then(function (answer){
        connection.query 
        ("SELECT * FROM employees WHERE ?",
        {
            emp_role_id:answer.viewrole
        },
        function (err, res) {
            if (err) throw err;
            console.table(res)
            inquirer.prompt({
                name:'exit',
                type:"list",
                message:'would you like to continue',
                choices:[
                    "yes",
                    "no"

                ]
            }).then(function(data){
                switch(data.exit){
                    case 'yes':
                        runSearch()
                        break 
                    case 'no':
                    connection.end()
                }
            })
        }
        
        
        )
    })
}


// Below are the function that allow the user to add Employees roles and departments
// add employee funciton 
function employeeAdd() {
    // Add a query that selects all employees and resolve in table so the user can see the data
    connection.query('SELECT * FROM employees',function(err,res){
        if (err) throw(err);
        console.table(res)
    })
    inquirer
        .prompt([
            {
                name: "addFirstName",
                type: "input",
                message: "INSERT FIRST NAME"
            },
            {
                name: "addLastName",
                type: "input",
                message: "INSERT LAST NAME"
            },
            {
                name: "addRoleID",
                type: "input",
                message: "INSERT EMPLOYEE ROLE ID"
            },
            {
                name: "addManagerID",
                type: "input",
                message: "INSERT MANAGER ID"
            }]

        )
        .then(function (answer) {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.addFirstName,
                    last_name: answer.addLastName,
                    emp_role_id: answer.addRoleID,
                    manager_id: answer.addManagerID,
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
function departmentAdd() {
    connection.query('SELECT * FROM department',function(err,res){
        if (err) throw(err);
        console.table(res)
    })
    inquirer
        .prompt({
            name: "addDepartment",
            type: "input",
            message: "Insert the name of the department you would like to add"
        }
        )
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    dept_name: answer.addDepartment

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
    connection.query('SELECT * FROM roles',function(err,res){
        if (err) throw(err);
        console.table(res)
    })
    inquirer
        .prompt([{
            name: "addTitle",
            type: "input",
            message: "insert role title"
        },
        {
            name: "salary",
            type: "input",
            message: "insert role Salary"
        },
        {
            name: "addDepartmentID",
            type: "input",
            message: "insert Department ID"
        },


        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.addTitle,
                    salary: answer.salary,
                    dept_id: answer.addDepartmentID,

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

/// These are the functions to update employees departments and roles


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
                name: "firstName",
                type: "input",
                message: "INSERT UPDATED FIRST NAME"
            }, {
                name: "lastName"
                , type: "input",
                message: "INSERT UPDATED LAST NAME"
            }, {
                name: "role_id",
                type: "input",
                message: "INSERT UPDATED ROLE ID"
            },
            {
                name:"manager_id",
                type:"input",
                message:"INSERT NEW MANAGER ID"
            }
        ]).then(function (answer) {
            connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        emp_role_id: answer.role_id,
                        manager_id: answer.manager_id

                    },
                    {
                        emp_id: answer.id
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

// function to update Roles 



function updateRole() {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log("Updating employee roles...\n");
    inquirer.prompt([
        {
            name: "role_id",
            type: "input",
            message: "enter ID of the role you would like to change"

        },
        {
            name: "newRole",
            type: "input",
            message: "Enter new Role"

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
                    title: answer.newRole,
                    salary: answer.newSalary,
                    dept_id: answer.newDepartmentId
                },
                {
                    role_id: answer.role_id
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

function updateDepartment() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res)
    })
    console.log("updating departments...\n")
    inquirer
        .prompt([
            {
                name: "departmentId",
                type: "input",
                message: "Enter department ID you wish to update"

            },
            {
                name: "departmentName",
                type: "input",
                message: "Enter updated department name"
            }
        ]).then(function (answer) {
            connection.query(
                "UPDATE department SET ? WHERE ?",
                [
                    {
                        dept_name: answer.departmentName
                    },
                    {
                        dept_id: answer.departmentId

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
            { emp_id: answer.id },
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
            { dept_id: answer.id },
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
            { role_id: answer.id },
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