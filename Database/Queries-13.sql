-- CLASS 13
/*
-- create a table to visualize triggers
CREATE TABLE IF NOT EXISTS trigger_audit (
	id INT PRIMARY KEY AUTO_INCREMENT,
    assetId INT NOT NULL,
    assetType VARCHAR(50) NOT NULL,
    performed VARCHAR(50) NOT NULL,
    changedDate DATETIME DEFAULT NULL,
    details TEXT DEFAULT NULL
);

SELECT * FROM trigger_audit;
SELECT * FROM employees;

-- update employees table
-- UPDATE employees SET jobTitle = 'Sales Manager (USA)' WHERE employeeNumber = 1165;
-- UPDATE employees SET jobTitle = 'VP' WHERE reportsTo = 1002;
UPDATE employees SET jobTitle = 'Sales Managers', reportsTo = 1165 WHERE employeeNumber = 1188;

SELECT * FROM trigger_audit;
SELECT * FROM employees;


SELECT customerNumber, creditLimit FROM customers WHERE customerNumber = 103;
-- customer makes a payment
INSERT INTO payments VALUES (103, 'abc456', CURDATE(), 2000);

SELECT * FROM payments WHERE customerNumber = 103;
*/

--
-- product : S24_2000
-- order : 10100
SELECT productCode, quantityInStock FROM products WHERE productCode = 'S24_2000';
SELECT * FROM orderdetails WHERE productCode = 'S24_2000' AND orderLineNumber = 20;

INSERT INTO orderdetails VALUES (10103, 'S24_2000', 5, 10.50, 20);

-- UPDATE products SET quantityInStock = 15 WHERE productCode = 'S24_2000';

SELECT productCode, quantityInStock FROM products WHERE productCode = 'S24_2000';
SELECT * FROM orderdetails WHERE productCode = 'S24_2000' AND orderLineNumber = 20;