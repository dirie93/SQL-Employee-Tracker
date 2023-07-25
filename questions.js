// Command Questions
const questions = [
  {
    type: "list",
    message: "Choose the operation you want to perform:",
    name: "options_selected",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update employee",
      "Finish",
    ],
    allowArrowKeyNavigation: true,
  },
];

const departmentQuestions = [
  {
    type: "input",
    message: "Add the name of the department:",
    name: "department_name",
  },
];

const roleQuestions = [
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
];

const employeeQuestions = [
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
];

const updateEmployeeRoleQuestions = [
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
];

module.exports = questions;
