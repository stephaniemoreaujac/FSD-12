-- HW 4 - create table statements
DROP TABLE IF EXISTS hw4_employee_project;
DROP TABLE IF EXISTS hw4_project;
DROP TABLE IF EXISTS hw4_employee;
DROP TABLE IF EXISTS hw4_department;

CREATE TABLE hw4_department(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE hw4_employee(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    dept_id int,
    
	FOREIGN KEY (dept_id) REFERENCES hw4_department(id)
);

CREATE TABLE hw4_project(
	id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(100) NOT NULL,
    status VARCHAR(100) DEFAULT 'active', 
    start_date DATE
);

CREATE TABLE hw4_employee_project(
	employee_id INT,
    project_id INT,
    hours INT DEFAULT 0,
    
    PRIMARY KEY (employee_id, project_id),
    FOREIGN KEY (employee_id) REFERENCES hw4_employee(id),
    FOREIGN KEY (project_id) REFERENCES hw4_project(id)
);