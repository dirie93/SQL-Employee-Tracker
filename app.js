const db = require("./config/connection");
const express = require("express");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const questions = require("./questions");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initial Questions
function startQuestions() {
  inquirer.prompt(questions).then((answer) => {
    console.log(answer);
    switch_actions(answer.options_selected);
  });
}

// User selection
function switch_actions(option) {
  switch (option) {
    case "View all departments":
      getAllDepartments();
      break;
    case "View all roles":
      getAllRoles();
      break;
    case "View all employees":
      getAllEmployees();
      break;
    case "Add a department":
      departmentQuestion();
      break;
    case "Add a role":
      roleQuestions();
      break;
    case "Add an employee":
      employeeQuestions();
      break;
    case "Update employee":
      updateEmployeeRole();
      break;
    case "Exit":
      console.log("Thank you for using the Employee Tracker. Goodbye!");
      process.exit(0);
    default:
      console.log("Invalid option. Please try again.");
      startQuestions();
  }
}

// display a success message
function displaySuccessMessage(message) {
  console.log(`\n✓ ${message}\n`);
}

// display if an error message
function displayErrorMessage(error) {
  console.error(`\nError: ${error}\n`);
}

// a prompt for continuing or exiting the application
function promptContinueOrExit() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Do you want to continue?",
        name: "continue",
        default: true,
      },
    ])
    .then((answer) => {
      if (answer.continue) {
        startQuestions();
      } else {
        console.log("Thank you for using the Employee Tracker. Goodbye!");
        process.exit(0);
      }
    });
}

// Function for adding a department
function departmentQuestion() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Add the name of the department:",
        name: "department_name",
      },
    ])
    .then((answer) => {
      addDepartment(answer.department_name);
    });
}

// Function for inserting data into the department table
function addDepartment(dept_name) {
  db.query(
    `INSERT INTO department (name) VALUES ("${dept_name}")`,
    (err, data) => {
      if (err) {
        displayErrorMessage("Failed to add department. Please try again.");
      } else {
        displaySuccessMessage("Department added successfully!");
      }
      promptContinueOrExit();
    }
  );
}

startQuestions();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
