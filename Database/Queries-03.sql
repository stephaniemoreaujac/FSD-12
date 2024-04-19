-- CLASS 03

-- Single line commnet

/* Multi 
line Comment
here */

-- SELECT STATEMENT
SELECT * FROM offices; -- * means ALL THE COLUMNS

SELECT * FROM orders;

-- specify specific columns
SELECT officeCode, city, phone FROM offices;

-- WHERE clause
SELECT * FROM orders WHERE customerNumber = 141;
SELECT * FROM orders WHERE customerNumber >= 490;

SELECT customerName, state FROM customers WHERE state = 'CA';
SELECT customerName, state FROM customers WHERE state <> 'CA'; -- <> mean not equal

-- WHERE clause field not required in selected values
SELECT customerName FROM customers WHERE state <> 'CA';

-- Multiple WHERE clause AND OR
SELECT customerName, state FROM customers WHERE state = 'PA' OR state = 'MA';
SELECT customerNumber, customerName, state FROM customers
	WHERE state = 'PA' AND customerNumber > 200;
    
-- no parentheses = unexpected result
SELECT customerNumber, customerName, state FROM customers
	WHERE (state = 'PA' OR state = 'MA') AND customerNumber > 200;

-- NOT IN / IN (instead of multiple ORs) 
SELECT customerName, state FROM customers 
	WHERE state NOT IN ('PA', 'MA', 'CT');
	-- WHERE state = 'PA' OR state = 'MA' OR state = 'CT';
SELECT customerNumber, customerName, salesRepEmployeeNumber, state FROM customers
	WHERE salesRepEmployeeNumber IN (1323, 1501) AND state NOT IN ('PA', 'MA', 'CT');

-- BETWEEN
SELECT customerNumber FROM customers WHERE customerNumber >= 200 AND customerNumber <= 300;
SELECT customerNumber FROM customers WHERE customerNumber BETWEEN 200 AND 300; -- inclusive
SELECT customerNumber FROM customers WHERE customerNumber NOT BETWEEN 200 AND 300; 

-- LIKE, case-insensitive
--  % = 0 or more characters
-- _ = 1 character

SELECT productName, productVendor FROM products WHERE productVendor LIKE 'Motor City Art Classics'; -- exactly Motor City Art Classics

SELECT productName, productVendor FROM products WHERE productVendor LIKE 'm%'; -- start with M
SELECT productName, productVendor FROM products WHERE productVendor LIKE '%Classics'; -- ends with Classics
SELECT productName, productVendor FROM products WHERE productVendor LIKE '%city%'; -- contains city
SELECT productName, productVendor FROM products WHERE productVendor LIKE 'm%s'; -- starts with M and ends with S

SELECT productName, productLine FROM products WHERE productLine LIKE '%a%cars'; -- ends with cars and an A is somewhere before
SELECT productName, productLine FROM products WHERE productLine LIKE '__a%'; -- 2 characters followed by A, followed by anything else

SELECT productName, productLine FROM products WHERE productLine LIKE '__a%nes'; 


-- AGGREGATE FUNCTIONS - min, max, count, sum, average
SELECT MIN(priceEach) FROM orderdetails; -- smallert possible value for that column
-- SELECT MIN(priceEach), productCode FROM orderdetails; -- NOT THE productCode that is the MIN priceEach
-- SELECT productCode, priceEach FROM orderdetails where productCode = 'S18_1749';

SELECT MAX(priceEach) FROM orderdetails; -- largest possible value for that column
SELECT SUM(priceEach) FROM orderdetails; -- total value of each row for that column
SELECT AVG(priceEach) FROM orderdetails; -- average value of each row for that coumn

SELECT COUNT(*) FROM orderdetails; -- returns total number of row

-- AS keyword provides alias for column name
SELECT COUNT(*) AS totalCount, 
	SUM(amount) AS sumOfAmount, 
	AVG(amount) AS avgOfAmount, 
	MIN(amount) AS smallestAmount, 
	MAX(amount) AS largestAmount
FROM payments WHERE customerNumber = 131; 

-- SELECT amount FROM payments WHERE customerNumber = 131;

-- Literal value 
SELECT 'hello wolrd' AS Hi, (10*5) AS mathStuff;

SELECT amount, amount/100 AS discount, 'CAD' AS currency FROM payments;

-- DONE ON DAY 4

-- DISTINCT - fetch unique values
SELECT DISTINCT(`status`) FROM orders; -- backtick ` allow to identify entities

SELECT COUNT( DISTINCT(`status`) ) AS NumStatus FROM orders; -- count the number of unique statuses

-- ORDER BY - default ASC
SELECT firstName, lastName, jobTitle FROM employees ORDER BY lastName DESC;
SELECT firstName, lastName, jobTitle FROM employees ORDER BY lastName ASC, firstName DESC;

SELECT firstName, lastName, jobTitle FROM employees WHERE jobTitle = 'Sales Rep' ORDER BY firstName;
