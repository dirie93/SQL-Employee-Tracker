/* ----------------If database exists ---------------  */
DROP DATABASE IF EXISTS employee_tracker_db;
/* ----------------If database doesn't exist ---------------  */
CREATE DATABASE employee_tracker_db;

USE employee_tracker; 

/* ---------------- Database Tables ---------------  */

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);


/* ---------------- Job Role Tables ---------------  */

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 3) NOT NULL,
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);


/* ---------------- Employee Tables ---------------  */

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    PRIMARY KEY (id)
); 