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

// Function to execute the selected action
function executeAction(option) {
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
    case "Finish":
      console.log("Thank you for using the Employee Tracker. Goodbye!");
      process.exit(0);
      break;
    default:
      console.log("Invalid option. Please try again.");
      promptContinueOrExit();
  }
}

// Initial Questions
function startQuestions() {
  inquirer.prompt(questions).then((answer) => {
    console.log(answer);
    executeAction(answer.options_selected);
  });
}

// Function to get all departments from the database
function getAllDepartments() {
  db.query("SELECT * FROM department", (err, data) => {
    if (err) {
      displayErrorMessage("Failed to retrieve departments. Please try again.");
    } else {
      displayDepartments(data);
      promptContinueOrExit();
    }
  });
}

// Function to display departments in a formatted way
function displayDepartments(departments) {
  console.log("\n=== All Departments ===");
  console.table(
    departments.map(({ id, name }) => ({
      "Department ID": id,
      "Department Name": name,
    }))
  );
}

// Function to get all roles from the database
function getAllRoles() {
  db.query("SELECT * FROM role", (err, data) => {
    if (err) {
      displayErrorMessage("Failed to retrieve roles. Please try again.");
    } else {
      displayRoles(data);
    }
    promptContinueOrExit();
  });
}

// Function to display roles in a formatted way
function displayRoles(roles) {
  console.log("\n=== All Roles ===");
  console.table(roles);
}

// Function to get all employees from the database
function getAllEmployees() {
  db.query("SELECT * FROM employee", (err, data) => {
    if (err) {
      displayErrorMessage("Failed to retrieve employees. Please try again.");
    } else {
      displayEmployees(data);
    }
    promptContinueOrExit();
  });
}

// Function to display employees in a formatted way
function displayEmployees(employees) {
  console.log("\n=== All Employees ===");
  console.table(employees);
}

// Function to prompt the user for adding a department
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

// Function to prompt the user for adding a role
function roleQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the title of the role:",
        name: "role_title",
      },
      {
        type: "input",
        message: "Enter the salary of the role:",
        name: "role_salary",
      },
      {
        type: "input",
        message: "Enter the department ID for the role:",
        name: "role_department_id",
      },
    ])
    .then((answers) => {
      addRole(
        answers.role_title,
        answers.role_salary,
        answers.role_department_id
      );
    });
}

// Function for inserting data into the role table
function addRole(title, salary, department_id) {
  db.query(
    `INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id})`,
    (err, data) => {
      if (err) {
        displayErrorMessage("Failed to add role. Please try again.");
      } else {
        displaySuccessMessage("Role added successfully!");
      }
      promptContinueOrExit();
    }
  );
}

// Function to prompt the user for adding an employee
function employeeQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the first name of the employee:",
        name: "employee_first_name",
      },
      {
        type: "input",
        message: "Enter the last name of the employee:",
        name: "employee_last_name",
      },
      {
        type: "input",
        message: "Enter the role ID for the employee:",
        name: "employee_role_id",
      },
      {
        type: "input",
        message:
          "Enter the manager ID for the employee (if applicable, otherwise leave empty):",
        name: "employee_manager_id",
      },
    ])
    .then((answers) => {
      addEmployee(
        answers.employee_first_name,
        answers.employee_last_name,
        answers.employee_role_id,
        answers.employee_manager_id
      );
    });
}

// Function for inserting data into the employee table
function addEmployee(first_name, last_name, role_id, manager_id) {
  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", ${role_id}, ${
      manager_id || null
    })`,
    (err, data) => {
      if (err) {
        displayErrorMessage("Failed to add employee. Please try again.");
      } else {
        displaySuccessMessage("Employee added successfully!");
      }
      promptContinueOrExit();
    }
  );
}

// Function to prompt the user for updating an employee's role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee ID you want to update:",
        name: "employee_id",
      },
      {
        type: "input",
        message: "Enter the new role ID for the employee:",
        name: "new_role_id",
      },
    ])
    .then((answers) => {
      updateEmployeeRoleInDB(answers.employee_id, answers.new_role_id);
    });
}

// Function to update the employee's role in the database
function updateEmployeeRoleInDB(employee_id, new_role_id) {
  db.query(
    `UPDATE employee SET role_id = ${new_role_id} WHERE id = ${employee_id}`,
    (err, data) => {
      if (err) {
        displayErrorMessage(
          "Failed to update employee role. Please try again."
        );
      } else {
        displaySuccessMessage("Employee role updated successfully!");
      }
      promptContinueOrExit();
    }
  );
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

startQuestions();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
