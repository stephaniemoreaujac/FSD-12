-- CLASS 06


-- Built-in date time functions
SELECT NOW(), DATE(NOW()), CURDATE(), CURTIME(), TIME(NOW()), DATE_FORMAT(NOW(), '%Y %m');


-- without fields I must provide value for each field in the correct order
INSERT INTO offices
	VALUES 
    ('Abbott', 'Ste-Anne', 'Lakeshore Road', '', 'Quebec','Canada', 'q1q1q1', 'NA', '555-5555');
    
SELECT * FROM offices;

INSERT INTO offices (officeCode, city, phone, addressLine1, territory)
	VALUES
    ('West-Island', 'Pointe-Claire', '555-1122', '123 Main', 'NA');
    /*
    1 row(s) affected, 3 warning(s): 
    1265 Data truncated for column 'officeCode' at row 1 
    1364 Field 'country' doesn't have a default value 
    1364 Field 'postalCode' doesn't have a default value
*/
-- when fields are provided, the order makes no difference as long as they match
INSERT INTO offices (officeCode, city, phone, addressLine1, territory, postalCode, country)
	VALUES
    ('North', 'Pointe-Claire', '555-1122', '123 Main', 'NA', 'h0h0h0', 'USA');

-- null values
INSERT INTO offices
	VALUES 
    ('West', 'West', '555-5555', 'Lakeshore Road', NULL, NULL,'Canada', 'q1q1q1', 'NA');
    

-- insert multiple rows
INSERT INTO payments (customerNumber, checkNumber, paymentDate)
	VALUES
		(112, 'chk1', NOW()),
        (112, 'chk2', NOW());

SELECT * FROM payments WHERE customerNumber = 112;

-- Incorrect number of values / fields
INSERT school (school_id, school_name) VALUES ('John Abbott');
INSERT school (school_name) VALUES (5, 'John Abbott');
-- Error Code: 1136. Column count doesn't match value count at row 1


-- auto-incrementing values
INSERT school (school_name) VALUES ('John Abbott');

SELECT * FROM school;

INSERT INTO students (student_email) VALUES ('j@j.j');
INSERT INTO students (student_email) VALUES ('j@j.j');
-- Error Code: 1062. Duplicate entry 'j@j.j' for key 'students.student_email'

-- insert into views
CREATE VIEW student_contact AS
	SELECT student_name, student_email FROM students;

INSERT INTO student_contact VALUES ('Arthur', 'a@a.a');
SELECT * FROM student_contact;
SELECT * FROM students;


-- UPDATES
SELECT * FROM school;

UPDATE school SET school_name = 'Abbott';
-- Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.

UPDATE school SET school_name = 'Abbott' WHERE school_id = 6;
-- updated the row

UPDATE school SET school_name = 'JAC' WHERE school_name = 'John Abbott';
-- Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.

SELECT * FROM students;

-- update multiple rows
UPDATE students 
SET student_age = 20, my_school = 15 
WHERE student_id = 5;
-- Error Code: 3819. Check constraint 'students_chk_1' is violated.
-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`freedb_fsd12_test`.`students`, CONSTRAINT `students_ibfk_1` FOREIGN KEY (`my_school`) REFERENCES `school` (`school_id`))

UPDATE school SET school_name = 'JAC' WHERE school_id > 0 AND school_name = 'John Abbott';

UPDATE school SET school_name = 'John Abbott' WHERE school_id IN (3,5,4);

SELECT * FROM school;


UPDATE students SET student_age = 77;

UPDATE students SET student_name = 'aaa' WHERE student_id > 0 AND student_name = 'Unknonw Name';
-- Sub query
UPDATE school SET school_name = 'aaa' 
	WHERE school_id IN (SELECT DISTINCT(my_school) FROM students);

SELECT DISTINCT(my_school) FROM students;
SELECT student_id FROM students WHERE student_name = 'aaa';

SELECT * FROM students;


-- DELETE

DELETE FROM students; -- similar to truncate but does not reset auto-increment

DELETE FROM school WHERE school_id = 4;