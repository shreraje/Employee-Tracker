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
            case "Add roles":
                addRoles();
                break;
            case "Add an employee":
                addEmployee();
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
