-- HW 3 - create table statements

DROP TABLE IF EXISTS hw3_student_course;
DROP TABLE IF EXISTS hw3_course;
DROP TABLE IF EXISTS hw3_student;
DROP TABLE IF EXISTS hw3_program;

CREATE TABLE hw3_program(
	id INT PRIMARY KEY AUTO_INCREMENT,
    program_number VARCHAR(12) NOT NULL,
    program_name VARCHAR(100) DEFAULT 'TBD'
);

CREATE TABLE hw3_student(
	id INT PRIMARY KEY AUTO_INCREMENT, 
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100), 
    program_id INT,
    crc_score DECIMAL(4,2),
    
    FOREIGN KEY (program_id) REFERENCES hw3_program(id)
    -- if this is here, must create hw3_program before
);

CREATE TABLE hw3_course(
	course_number INT PRIMARY KEY AUTO_INCREMENT,
    course_title VARCHAR(100) NOT NULL
);

CREATE TABLE hw3_student_course(
	student_id INT,
    course_number INT,
    grade DECIMAL(5,2) DEFAULT 0,
    
    PRIMARY KEY (student_id, course_number),
    FOREIGN KEY (student_id) REFERENCES hw3_student(id),
    FOREIGN KEY (course_number) REFERENCES hw3_course(course_number)
);
/*
if a table has multiple primary keys (composite key)
we can not declare the PK constaint direclty on the row

-- Error Code: 1068. Multiple primary key defined

instead we add the PK constaint after the fields list
*/