/* ---------------- Department Table ---------------  */

INSERT INTO department (name) VALUES
  ('Human Resources'),
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('Finance');



/* ---------------- Role Table ---------------  */

INSERT INTO role (title, salary, department_id) VALUES
  ('HR Manager', 65000.00, 1),
  ('Sales Associate', 40000.00, 2),
  ('Marketing Specialist', 50000.00, 3),
  ('Software Engineer', 75000.00, 4),
  ('Financial Analyst', 60000.00, 5);



/* ---------------- Employee Table ---------------  */

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 4, NULL), 
  ('Jane', 'Smith', 1, 1),    
  ('Mike', 'Johnson', 2, 1),   
  ('Emily', 'Brown', 3, 2),   
  ('David', 'Lee', 5, NULL);  