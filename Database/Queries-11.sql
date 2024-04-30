-- CLASS 11

-- DELIMIER allows us to use the new symbol to end our statements
DELIMITER //
SELECT * FROM offices//
SELECT * FROM customers//

-- change back to semi-colons
DELIMITER ; 
SELECT * FROM orders;
SELECT 
	paymentDate, 
	DATE_ADD(paymentDate, INTERVAL 40 DAY), 
	DATE_SUB(paymentDate, INTERVAL 40 DAY) 
FROM payments;


-- stored procedure
CALL spEmployeeDirectory();
CALL spUpdatePaymentDate();

CALL spUpdatePaymentByXDays(30);
CALL spUpdatePaymentByXDays(10);
CALL spUpdateCheckByXDays('JJ246391', 20);

CALL spFetchSalesCustomer(1370);
CALL spFetchSalesCustomer(1165);
CALL spFetchSalesCustomer(1504);


-- FUNCTIONS
SELECT fnOwnerName();

SELECT fnRandomEmployee();

SELECT 
	lastName, 
	firstName, 
    jobTitle, 
    fnEmployeePhone(employeeNumber)
FROM employees;

SELECT 
	customerName, 
	fnEmployeePhone(salesRepEmployeeNumber) AS saleRepContactPhone
FROM customers
LIMIT 10;

SELECT 
	customerName, 
    creditLimit, 
    fnGoodCredit(creditLimit) 
FROM customers
LIMIT 10;

SELECT 
	orderNumber, 
	productCode, 
    priceEach, 
    quantityOrdered,
	fnCalcTotalOf(priceEach, quantityOrdered) AS orderProductTotal
FROM orderdetails
ORDER BY orderNumber, productCode;

