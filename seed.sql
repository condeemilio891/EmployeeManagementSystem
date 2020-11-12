DROP DATABASE IF EXISTS EMPLOYEE_DB;
CREATE DATABASE EMPLOYEE_DB;

USE EMPLOYEE_DB;

CREATE TABLE department( 
id int NOT NULL, 
namee VARCHAR(30),
PRIMARY KEY (id)
); 
 
 CREATE TABLE roles( 
 id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
 title VARCHAR(30), 
 salary decimal (10,4) NOT NULL, 
 department_id INT NOT NULL 
 ); 

 
CREATE TABLE employees(
id int NOT NULL,
title VARCHAR(30),
salary decimal (10,4) NOT NULL,
role_id int NOT NULL, 
manager_id int NOT NULL,
PRIMARY KEY(id)
);


USE EMPLOYEE_DB;
INSERT INTO  employees(id,title,salary,role_id,manager_id)
VALUES (1,"Emilio",100,1,1);
INSERT INTO  employees(id,title,salary,role_id,manager_id)
VALUES (2,"Emili",101,2,2);


USE EMPLOYEE_DB;
INSERT INTO  department(id,namee)
VALUES (1,"Terran");
INSERT INTO  department(id,namee)
VALUES (2,"Zerg");
INSERT INTO  department(id,namee)
VALUES (3,"Protoss");

USE EMPLOYEE_DB; 
INSERT INTO roles(id,title,salary,department_id)
VALUES (1,"SCV",100,1);

SELECT * FROM department;
SELECT * FROM employees;
SELECT * FROM roles;
