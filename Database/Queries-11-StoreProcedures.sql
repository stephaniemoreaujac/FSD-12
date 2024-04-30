-- CLASS 11 STORED PROCEDURES
DROP PROCEDURE IF EXISTS spEmployeeDirectory;
DROP PROCEDURE IF EXISTS spUpdatePaymentDate;
DROP PROCEDURE IF EXISTS spUpdatePaymentByXDays;
DROP PROCEDURE IF EXISTS spUpdateCheckByXDays;
DROP PROCEDURE IF EXISTS spFetchSalesCustomer;

-- allows us to use ; inside our store 
-- DO NOT PUT BUT COMMENTS ON THE DELIMITER LINE!!!!
DELIMITER // 

-- fetch employess and their phone numbers
CREATE PROCEDURE spEmployeeDirectory()
BEGIN
	SELECT 
		CONCAT(lastName,', ',firstName) AS fullName, 
		jobTitle, 
		CONCAT(phone,', ',extension) AS phoneNumber
    FROM employees
    LEFT JOIN offices ON employees.officeCode = offices.officeCode
    ORDER BY lastName;
END //

-- update the payment dates
CREATE PROCEDURE spUpdatePaymentDate()
BEGIN
	SELECT * FROM payments ORDER BY paymentDate;
    
	UPDATE payments
    SET paymentDate = DATE_ADD(paymentDate, INTERVAL 7 DAY)
    WHERE customerNumber > 0;
    
    SELECT * FROM payments ORDER BY paymentDate;

END //

-- update the payment date X days
CREATE PROCEDURE spUpdatePaymentByXDays(argDays INT)
BEGIN
    SELECT * FROM payments ORDER BY paymentDate;

	UPDATE payments
    SET paymentDate = DATE_ADD(paymentDate, INTERVAL argDays DAY)
    WHERE customerNumber > 0;
    
    SELECT * FROM payments ORDER BY paymentDate;

END //

-- update specific check by x days - 2 arguments
CREATE PROCEDURE spUpdateCheckByXDays (argCheck VARCHAR(50), argDays INT)
BEGIN
	SELECT * FROM payments WHERE checkNumber = argCheck;
    
    UPDATE payments
    SET paymentDate = DATE_ADD(paymentDate, INTERVAL argDays DAY)
    WHERE checkNumber = argCheck;
    
    SELECT * FROM payments WHERE checkNumber = argCheck;

END //


-- Create a stored procedure spFetchSalesCustomers
-- it will retrieve the customers full name, phone number and thier total number of orders,
	-- for all the customers who have a specific sales rep
-- The sales rep will be the input parameter for the stored procedure
-- Order the results by the total number of orders but without repeating the aggregate function

CREATE PROCEDURE spFetchSalesCustomer (argSalesRepId INT)
BEGIN

	SELECT 
		CONCAT(contactFirstName, ' ', contactLastName) AS fullName,
		phone,
        COUNT(orders.orderNumber) AS totalOrders
	FROM customers
	JOIN orders ON customers.customerNumber = orders.customerNumber
    WHERE salesRepEmployeeNumber = argSalesRepId
    GROUP BY orders.customerNumber 
    ORDER BY totalOrders DESC;

END //









DELIMITER ; -- return delimiter back to ;