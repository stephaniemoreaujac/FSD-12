-- DEMO user

SELECT * FROM offices;
-- 122 row(s) returned

SELECT * FROM customers;
-- Error Code: 1142. SELECT command denied to user 'demo'@'localhost' for table 'customers'

SELECT customerNumber, customerName FROM customers;
-- 122 row(s) returned
