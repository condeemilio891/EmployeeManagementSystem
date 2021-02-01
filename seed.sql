

DROP DATABASE IF EXISTS company_db;
CREATE database company_db;

USE company_db;

CREATE TABLE department (
    dept_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (dept_id)
);

CREATE TABLE company_role (
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DEC(7,2) NOT NULL,
    dept_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE employees (
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    emp_role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (emp_role_id) REFERENCES company_role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);

INSERT INTO department (dept_name) 
VALUES ("Theoretical Physics"), 
("Bio-Tech"), 
("AdvancedBiologicalResearch"),
("Security"),
("Administration"),
("Services");


INSERT INTO company_role (title, salary, dept_id) VALUES
('Administrator', 80000.00, 3), 
('Head of research', 30000.00, 1 ),
('Level 3 Research associate', 20000.00, 1),                
('Level 4 Research associate', 40000.00, 2),
('Level 5 Research associate', 30000.00, 2),
('Head of security', 20000.00, 1),
('Security Guard',40000.00,1),
('Head Chef', 60000.00, 6),
('Cook', 30000.00, 6);

INSERT INTO employees (first_name, last_name, emp_role_id, manager_id) VALUES
('Wallace', 'Breen', 1, null),
('Gordon', 'Freeman', 3, null),
('Robert', 'Rosenburg', 3, 1),
('Richard', 'Keller', 3, null),
('Gina', 'Cross', 4, null),
('Colette', 'Green', 4, null),
('Isaac', 'Kleiner', 4, null),
('Eli', 'Vance', 5, null),
('Barney', 'Calhoon',6,null),
('Arne', 'Magnusson', 7, null),
('Antonio','vilanelli',8,null),
('margrett-ann','brennan',9,null);


SELECT * FROM department;
SELECT * FROM company_role;
SELECT * FROM employees