-- CLASS 04
/*
-- create a new table students, add single field student_name
CREATE TABLE students (
	student_name VARCHAR(50)
);

SELECT * FROM students; -- there is nothing in the table

-- INSERT data into the students table - more details on INSERT in later class
INSERT INTO students VALUE ('Steph');
INSERT INTO students VALUE ('Bob');
INSERT INTO students VALUE ('Henri');
INSERT INTO students VALUE ('Adele');

SELECT * FROM students; -- should see the 4 rows we just added

TRUNCATE students; -- remove all the rows from the table

SELECT * FROM students; -- there is nothing in the table

DROP TABLE students; -- remoe the table from the database

SELECT * FROM students; -- ERROR - table does not exist

*/

/*
-- create a new table students, add 2 fields
CREATE TABLE students (
	student_id INT,
	student_name VARCHAR(50)
);

-- INSERT data into the students table - more details on INSERT in later class
INSERT INTO students VALUE (1, 'Steph');
INSERT INTO students VALUE (2, 'Bob');
INSERT INTO students VALUE (3, 'Henri');
INSERT INTO students VALUE (4, 'Adele');

SELECT * FROM students; -- should see the 4 rows we just added

INSERT INTO students VALUE (1, 'Juliet');
SELECT * FROM students; -- uhoh, 2 student with id = 1 !!!!

DROP TABLE students; -- remove table from database

*/

/*
-- error occurs if you try to drop a table that does not exists. 
 -- Adding the if exist condition to the drop table statement prevents the error.
DROP TABLE IF EXISTS students; -- remove table from database (if it exists)

-- establish a PK
CREATE TABLE students (
	student_id INT PRIMARY KEY,
	student_name VARCHAR(50)
);
-- INSERT 2 rows into the table
INSERT INTO students VALUE (1, 'Steph');
INSERT INTO students VALUE (2, 'Bob');

SELECT * FROM students; 

INSERT INTO students VALUE (1, 'Juliet');
-- Error Code: 1062. Duplicate entry '1' for key 'students.PRIMARY'

INSERT INTO students (student_name) VALUE ('Henri');
-- 1 row(s) affected, 1 warning(s): 1364 Field 'student_id' doesn't have a default value
-- it insert the row but with default value of the int = 0
INSERT INTO students (student_name) VALUE ('Arthur');
-- Error Code: 1062. Duplicate entry '0' for key 'students.PRIMARY'
-- the default value 0 is already used.
*/

/*
DROP TABLE IF EXISTS students; -- remove table from database (if it exists)

-- Force fields to have a value by using NOT NULL
CREATE TABLE students (
	student_id INT PRIMARY KEY,
	student_name VARCHAR(50) NOT NULL
);

INSERT INTO students VALUE (1, 'Juliet');
INSERT INTO students (student_id) VALUES (3);
-- 1 row(s) affected, 1 warning(s): 1364 Field 'student_name' doesn't have a default value
-- row inserted but default varchar value given = (empty string)

SELECT * FROM students; -- 2 rows

*/

/*
DROP TABLE IF EXISTS students; -- remove table from database (if it exists)

-- set DEFAULT value for field and force unique value NOT NULL
CREATE TABLE students (
	student_id INT PRIMARY KEY,
	student_name VARCHAR(50) NOT NULL DEFAULT 'unknonw',
    student_email VARCHAR(150) UNIQUE
);

INSERT INTO students VALUES (1, 'Steph', 's@s.s');
INSERT INTO students VALUES (2, 'Henri', 'h@h.h');
INSERT INTO students VALUES (4, 'Arthur', 'h@h.h');
-- Error Code: 1062. Duplicate entry 'h@h.h' for key 'students.student_email'

INSERT INTO students (student_id, student_email) VALUES (5656495, 'j@j.j');

SELECT * FROM students; - 3 rows
*/

/*

DROP TABLE IF EXISTS students; -- remove table from database (if it exists)

-- auto incrementing value on PK
CREATE TABLE students (
	student_id INT PRIMARY KEY AUTO_INCREMENT,
	student_name VARCHAR(50) NOT NULL DEFAULT 'unknonw',
    student_email VARCHAR(150) UNIQUE
);
-- INSERT rows into the table
INSERT INTO students (student_email) VALUES ('aaa');
INSERT INTO students (student_email) VALUES ('bbb');
INSERT INTO students (student_email) VALUES ('ccc');
INSERT INTO students (student_email) VALUES ('ddd');
INSERT INTO students (student_email) VALUES ('eee');
INSERT INTO students (student_id, student_email) VALUES (60, '--- I did 6 ---'); -- sets the autoincrementing value to 60
INSERT INTO students (student_email) VALUES ('fff'); -- student_id will be 61

SELECT * FROM students; - 7 rows - the next rows pk will be 62

TRUNCATE students; -- resets the autoincrementing value
INSERT INTO students (student_email) VALUES ('ccc');

SELECT * FROM students; - 1 rows - pk is back at 1
*/

/*

DROP TABLE IF EXISTS students; -- remove table from database (if it exists)

-- CHECK constraint
CREATE TABLE students (
	student_id INT PRIMARY KEY AUTO_INCREMENT,
	student_name VARCHAR(50) NOT NULL DEFAULT 'unknonw',
    student_email VARCHAR(150) UNIQUE,
    student_age INT CHECK (student_age >=16)
);
-- INSERT rows into table
INSERT students (student_email, student_age) VALUES ('aaa', 20);
INSERT students (student_email, student_age) VALUES ('bbb', 18);
INSERT students (student_email, student_age) VALUES ('ccc', 12);
-- Error Code: 3819. Check constraint 'students_chk_1' is violated.

SELECT * FROM students; -- 2 rows
*/

/*
-- create a new table named school
CREATE TABLE school (
	school_id INT PRIMARY KEY AUTO_INCREMENT,
	school_name VARCHAR(20)
);
INSERT INTO school (school_name) VALUES ('John Abbott');
INSERT INTO school (school_name) VALUES ('Vanier');

-- add the school_id field to the student table
ALTER TABLE students ADD school INT;

-- add column this specific location
ALTER TABLE students ADD school_dummy INT AFTER student_id;
-- remove a column
ALTER TABLE students DROP COLUMN school_dummy;
*/

/*

SELECT * FROM students;
SELECT * FROM school;

ALTER TABLE students RENAME COLUMN school TO my_school;

-- FK after table creation
ALTER TABLE students
	ADD FOREIGN KEY (my_school) REFERENCES school(school_id);
-- alter the table by adding a FK to my_school (fields in students table)
 -- associate it to the school_id field in the school table
*/

/*
-- be careful with constraints 
	-- creating and dropping tables with contraints can cause errors if not done in the correct order

CREATE TABLE bbb (
	my_id INT PRIMARY KEY AUTO_INCREMENT,
    my_other INT
);


CREATE TABLE aaa (
	my_id INT PRIMARY KEY AUTO_INCREMENT,
    my_other INT,
    
    FOREIGN KEY (my_other) REFERENCES bbb(my_id)
);
-- if i try to do this before CREATE TABLE bbb = ERROR unknown reference


-- ALTER TABLE aaa DROP COLUMN my_other;
-- Error Code: 1828. Cannot drop column 'my_other': needed in a foreign key constraint 'aaa_ibfk_1'

-- remove existing constraints
ALTER TABLE aaa DROP CONSTRAINT aaa_ibfk_1;

DROP TABLE aaa; 
DROP TABLE bbb; 
-- if i try to drop bbb before aaa
	-- Error Code: 3730. Cannot drop table 'bbb' referenced by a foreign key constraint 'aaa_ibfk_1' on table 'aaa'.

*/