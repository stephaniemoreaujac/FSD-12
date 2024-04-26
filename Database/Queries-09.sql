-- CLASS 9

-- Retrieve all the employees full phone number
-- EMPLOYEE name, OFFICE phone, EMPLOYEE extension

SELECT firstName, lastName, extension, officeCode FROM employees;
SELECT officeCode, phone FROM offices;

SELECT firstName, lastName, phone, extension, employees.officeCode, offices.officeCode
FROM employees, offices
WHERE employees.officeCode = offices.officeCode AND employees.officeCode = 3;

-- WE SHOULD NOT USE WHERE TO JOIN MULTIPLE TABLES

-- INNER JOIN / JOIN
SELECT firstName, lastName, phone, extension, employees.officeCode, offices.officeCode
FROM employees
JOIN offices ON employees.officeCode = offices.officeCode;

-- retrieve all the customer name and their sales rep name
SELECT contactFirstName AS customerName, firstName AS salesRepName
FROM customers
JOIN employees ON customers.salesRepEmployeeNumber = employees.employeeNumber
WHERE state = 'CA';

-- LEFT JOIN
-- retrieve all the customers total paid amounts (if they have any)
SELECT customerName, SUM(amount)
FROM customers
LEFT JOIN payments ON customers.customerNumber = payments.customerNumber
GROUP BY payments.customerNumber;

-- retrieve all customers who have cancelled
SELECT orderNumber, status, customerName
FROM orders
RIGHT JOIN customers ON orders.customerNumber = customers.customerNumber;

SELECT orderNumber, status, customerName
FROM customers
LEFT JOIN orders ON customers.customerNumber = orders.customerNumber;

-- INNER JOIN vs LEFT JOIN = what about Diane Murphy
SELECT CONCAT(e1.firstName,' ',e1.lastName) AS emp, CONCAT(e2.firstName,' ',e2.lastName) AS boss
FROM employees AS e1
JOIN employees AS e2 ON e1.reportsTo = e2.employeeNumber;

SELECT CONCAT(e1.firstName,' ',e1.lastName) AS emp, CONCAT(e2.firstName,' ',e2.lastName) AS boss
FROM employees AS e1
LEFT JOIN employees AS e2 ON e1.reportsTo = e2.employeeNumber;

-- MULTIPLE TABLE JOIN
-- retrieve all customers and the full phone number to their sales rep
SELECT 
	customers.customerName,
    CONCAT(employees.firstName, ' ', employees.lastName) AS salesRep,
    CONCAT(offices.phone, ' ', employees.extension) AS phoneNumber
FROM customers
JOIN employees ON customers.salesRepEmployeeNumber = employees.employeeNumber
JOIN offices ON employees.officeCode = offices.officeCode
WHERE offices.officeCode = 3 ;

-- CREATE VIEW customerPaidOffice3 AS
SELECT 
	customers.customerName,
    CONCAT(employees.firstName, ' ', employees.lastName) AS salesRep,
    CONCAT(offices.phone, ' ', employees.extension) AS phoneNumber,
    SUM(payments.amount) AS totalPaid
FROM customers
JOIN employees ON customers.salesRepEmployeeNumber = employees.employeeNumber
JOIN offices ON employees.officeCode = offices.officeCode
LEFT JOIN payments on customers.customerNumber = payments.customerNumber
WHERE offices.officeCode = 3 
GROUP BY payments.customerNumber;

-- equivalent to query above (minus the left join) 
SELECT 
	customers.customerName,
    CONCAT(employees.firstName, ' ', employees.lastName) AS salesRep,
    CONCAT(offices.phone, ' ', employees.extension) AS phoneNumber,
    SUM(payments.amount) AS totalPaid
FROM customers, employees, offices, payments
WHERE 
	customers.salesRepEmployeeNumber = employees.employeeNumber AND 
	employees.officeCode = offices.officeCode AND 
    customers.customerNumber = payments.customerNumber AND
    offices.officeCode = 3 
GROUP BY payments.customerNumber;

SELECT * FROM customerPaidOffice3; -- using our view

-- EMULATION OF A FULL JOIN (not supported in mysql)
SELECT customers.customerName, customers.salesRepEmployeeNumber, employees.firstName, employees.lastName
FROM customers
LEFT JOIN employees ON customers.salesRepEmployeeNumber = employees.employeeNumber
UNION
SELECT customers.customerName, customers.salesRepEmployeeNumber, employees.firstName, employees.lastName
FROM customers
RIGHT JOIN employees ON customers.salesRepEmployeeNumber = employees.employeeNumber;

-- mysql does not care about relationship, it does what its told to do!
SELECT school.school_name, offices.phone, school.school_id, offices.officeCode
FROM school
JOIN offices ON school.school_id = offices.officeCode;

-- Retrieve the full name of every employee and the full name of the person they report to
-- order by the last name of the person they report to
SELECT
	CONCAT(e1.firstName, ' ', e1.lastName) AS employee,
    CONCAT(e2.firstName, ' ', e2.lastName) AS boss
FROM employees AS e1
LEFT JOIN employees AS e2 ON e1.reportsTo = e2.employeeNumber
ORDER BY e2.lastName;

-- Retrieve the order number, status, customer name, sales rep full name for all orders
-- where customers have a credit limite higher then 100,000
SELECT 
	orders.orderNumber, 
	orders.status,
    customers.customerName,
    CONCAT(employees.firstName, ' ', employees.lastName) AS salesRep
FROM orders
JOIN customers ON orders.customerNumber = customers.customerNumber
JOIN employees ON customers.salesRepEmployeeNumber = employees.employeeNumber
WHERE customers.creditLimit > 100000
;


-- FUNCTIONS

SELECT UPPER(lastName), LOWER(firstName) FROM employees;

SELECT * FROM offices WHERE LENGTH(state) = 2;


-- coalesce, return given value if other null
SELECT
	CONCAT(e1.firstName, ' ', e1.lastName) AS employee,
    CONCAT(e2.firstName, ' ', e2.lastName) AS boss,
    COALESCE(e2.extension, e1.reportsTo, 'Contact Me')  AS bossContact
FROM employees AS e1
LEFT JOIN employees AS e2 ON e1.reportsTo = e2.employeeNumber;










