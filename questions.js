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
  },
  {
    type: "input",
    message: "Add the name of the department:",
    name: "department_name",
  },
  {
    type: "input",
    message: "Add the first name of the employee:",
    name: "emp_firstName",
  },
  {
    type: "input",
    message: "Add the last name of the employee:",
    name: "emp_lastName",
  },
  {
    type: "input",
    message: "Add the role of the employee:",
    name: "emp_role",
  },
  {
    type: "input",
    message: "Add the manager id of the employee:",
    name: "emp_manager",
  },
  {
    type: "input",
    message: "Add the name of the role:",
    name: "role_name",
  },

  {
    type: "input",
    message: "Please select employee you want to update:",
    name: "emp_update",
  },
  {
    type: "input",
    message: "What is the updated role of the employee?",
    name: "update_emp",
  },
];

module.exports = questions;
