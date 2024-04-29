-- 
SELECT * FROM offices;
-- 7 row(s) returned

UPDATE offices SET state = 'NY' WHERE officeCode = 4;
-- Error Code: 1142. UPDATE command denied to user 'only_select'@'localhost' for table 'offices'

UPDATE customers SET phone = '514.555.1236' WHERE customerNumber = 103;
-- 0 row(s) affected Rows matched: 1  Changed: 0  Warnings: 0

SELECT * FROM customers;
-- 122 row(s) returned
