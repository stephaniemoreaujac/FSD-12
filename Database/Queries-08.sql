 -- CLASS 08
 
 -- LIMIT
SELECT * FROM offices ORDER BY officeCode DESC; -- return ALL THE ROWS
 
SELECT * FROM offices ORDER BY officeCode DESC LIMIT 3; -- return only 3 rows
 
SELECT * FROM offices ORDER BY officeCode DESC LIMIT 2, 3; -- return 3 rows, starting for index 2

-- SUBQUERIES
SELECT MAX(creditLimit) FROM customers;
SELECT * FROM customers WHERE creditLimit = 227600.00;

SELECT * FROM customers WHERE creditLimit = (SELECT MAX(creditLimit) FROM customers);

-- single value is returned from subqueries
SELECT productCode, MIN(MSRP) FROM products;
SELECT productCode, MSRP, (SELECT MIN(MSRP) FROM products) FROM products;

-- DO NOT DO THIS - subqueries on the rigth
SELECT productCode FROM products WHERE (SELECT MAX(buyPrice) FROM products) = buyPrice;

--  multiple rows returned in subquery
SELECT DISTINCT(customerNumber) FROM orders WHERE status <> 'shipped';
SELECT * 
FROM customers
WHERE customerNumber IN ( SELECT DISTINCT(customerNumber) FROM orders WHERE status <> 'shipped' )
ORDER BY customerName;

-- ALL (and) ANY (or)
SELECT orderNumber, requiredDate FROM orders
WHERE requiredDate = ANY ( SELECT orderDate FROM orders );

-- Write a query that returns all order_id and order_date that has at least one item that is priced over 150$
SELECT DISTINCT(orderNumber) FROM orderdetails WHERE priceEach > 150; -- inner query

SELECT orderNumber, orderDate FROM orders 
WHERE orderNumber IN ( SELECT DISTINCT(orderNumber) FROM orderdetails WHERE priceEach > 150 );

-- Write a query to select all the order_id and order_date who have 70 of more product in an order
SELECT DISTINCT(orderNumber) FROM orderdetails WHERE quantityOrdered >= 70; -- inner query

SELECT orderNumber, orderDate FROM orders
WHERE orderNumber IN (SELECT DISTINCT(orderNumber) FROM orderdetails WHERE quantityOrdered >= 70);

-- Write a query that returns all the employees that are reported to
SELECT DISTINCT(reportsTo) FROM employees; -- inner query

SELECT * FROM employees WHERE employeeNumber IN (SELECT DISTINCT(reportsTo) FROM employees);


-- CORRELATED SUB QUERY
-- select all product whose buyPrice is greater then the average buyPrice of their productLine

SELECT * FROM products;
SELECT AVG(buyPrice) FROM products WHERE productLine = 'Classic Cars';
-- SELECT AVG(buyPrice) FROM products WHERE productLine = THE_CURRENT_PRODUCTS_productLine_VALUE;

SELECT productName, productLine, buyPrice 
FROM products AS prod1
WHERE buyPrice > ( 
	SELECT AVG(buyPrice) FROM products 
    WHERE productLine = prod1.productLine 
    );
    
-- AGGREGATES
SELECT COUNT(*), MIN(MSRP), MAX(MSRP), AVG(MSRP),SUM(MSRP)  FROM products WHERE productLine = 'Classic Cars';
SELECT MIN(MSRP), productCode  FROM products WHERE productLine = 'Classic Cars';

-- GROUP BY
-- for each productLine show how many there are, the min and max buyprice for products in their productLine
SELECT productLine, MAX(buyPrice), MIN(buyPrice) FROM products WHERE productLine = 'Classic Cars'; -- not ideal

-- better way to yield dynamic results
SELECT productLine, COUNT(productLine), MAX(buyPrice), MIN(buyPrice) 
FROM products
GROUP BY productLine;

-- count the number of product over 40$ for each productline. 
-- only show the first 4 rows and those that have more than 10 products in their productLine
SELECT productLine, COUNT(productLine)
FROM products
WHERE buyPrice > 40 
GROUP BY productLine
HAVING COUNT(productLine) > 10
LIMIT 4;


-- find the total price for each order
-- you need only show the order_id and the orderTotal (you need to calculate the total price of the order)
SELECT orderNumber, SUM(priceEach * quantityOrdered) AS orderTotal
FROM orderdetails
GROUP BY orderNumber;

-- double check
SELECT *, (priceEach * quantityOrdered) FROM orderdetails WHERE orderNumber = 10100; -- 10223.83

-- find the product_id and total number of products that were ordered for orders that have been shipped
SELECT productCode, SUM(quantityOrdered)
FROM orderdetails
WHERE orderNumber IN ( SELECT orderNumber FROM orders WHERE status = 'Shipped' )
GROUP BY productCode;

-- find the total number of employees that work in each office that has 3 or more employees
SELECT officeCode, COUNT(*)
FROM employees
GROUP BY officeCode
HAVING COUNT(*) >= 3;




SELECT orderDate, orderNumber FROM orders;
SELECT paymentDate, customerNumber FROM payments;

SELECT orderDate AS myDate, orderNumber AS numbers FROM orders
UNION
SELECT paymentDate, customerNumber FROM payments

ORDER BY 1;


-- find the first, last, and phone number for all staff and customers
-- include text field to differentiate 'employee' and 'customer'

SELECT firstName, lastName, extension, 'employee' FROM employees
UNION
SELECT contactFirstName, contactLastName, phone, 'customer' FROM customers

-- order and limit apply to the entire union (yes you can put comments in the middle of a query)
ORDER BY 2
LIMIT 20;