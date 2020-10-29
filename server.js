var mysql = require("mysql");
var inquirer = require("inquirer");
require('dotenv').config();

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DB_PASS,
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    optionMenu();
});

function optionMenu() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Please choose what you would like to perform!",
        choices: [
            "Add department", "Add roles", "Add an employee", "View departments", "View roles", "View employees", "Update an employee roles", "Exit"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            // Add a callback function to each actions
            case "Add department":
                addDepartment();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add roles":
                addRoles();
                break;
            case "View departments":
                viewDepartment();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Update an employee roles":
                updateEmployees();
                break;
            case "Exit":
                console.log("Thanks for using this app!");
                connection.end();
        }
    });
};

// Function to add Department name
function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "Please enter department name you would like to add!"
    }).then(function (answer) {
        var query = "INSERT INTO department SET ?"
        connection.query(query, { name: answer.department }, function (err, res) {
            if (err) throw err;
            console.log("Added your department name!")
            optionMenu();
        })
    })
}

// Function to add an Employee's first and last name
function addEmployee() {
    inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "Please enter the first name of an employee!"
        }, {
            name: "last",
            type: "input",
            message: "Please enter the last name of an employee!"
        }
    ]).then(function (answer) {
        var query = "INSERT INTO employee SET ?"
        connection.query(query, { firstname: answer.firstname, lastname: answer.lastname }, function (err, res) {
            if (err) throw err;
            console.log("Added an employee!");
            optionMenu();
        })
    })
}

// Function to add Roles & salaries for an employee
function addRoles() {
    inquirer.prompt([
        {
            name: "roles",
            type: "input",
            message: "Please enter the role you would like to add!"
        }, {
            name: "salary",
            type: "input",
            message: "Please enter the salary for this role!"
        }
    ]).then(function (answer) {
        var query = "INSERT INTO role SET ?"
        connection.query(query, { title: answer.roles, salary: answer.salary }, function (err, res) {
            if (err) throw err;
            console.log("Added employee's role & salary!")
            optionMenu();
        })
    })
}
