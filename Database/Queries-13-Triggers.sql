-- CLASS 13 triggers
DROP TRIGGER IF EXISTS before_update_employees;
DROP TRIGGER IF EXISTS after_insert_payments;
DROP TRIGGER IF EXISTS before_insert_orderDetails;

-- so we can use the ; in our trigger action
DELIMITER //
 
-- create a trigger before updating employee table
CREATE TRIGGER before_update_employees
	BEFORE UPDATE ON employees
    FOR EACH ROW
BEGIN
	-- INSERT INTO trigger_audit (assetId, assetType, performed, changedDate)
    -- VALUES	( OLD.employeeNumber, 'employees', 'update', NOW() );

	DECLARE fullDetails TEXT;
    
    IF OLD.jobTitle <> NEW.jobTitle THEN
		SET fullDetails = 'jobTitle has changed. ';
	END IF;
    
    IF OLD.reportsTo <> NEW.reportsTo THEN
		SET fullDetails = CONCAT(fullDetails, 'reportsTo has changed. ');
	END IF;
    
	INSERT INTO trigger_audit (assetId, assetType, performed, changedDate, details)
    VALUES	( OLD.employeeNumber, 'employees', 'update', NOW(), fullDetails );
    
END //

/*
	Create a trigger that will automatically increase the customers credit by 100$ 
	if they make a payment over 1000$
*/
CREATE TRIGGER after_insert_payments
	AFTER INSERT ON payments
    FOR EACH ROW
BEGIN
	-- check that payment is ove 1000$
	IF NEW.amount > 1000 THEN
		-- update the customer credit
        UPDATE customers
        SET creditLimit = ( creditLimit + 100 )
		WHERE customerNumber = NEW.customerNumber;
    END IF;

END //


/*
	Create a trigger that will automatically reduce the quantityInStock of a product
	when that product has been ordered
	- trigger should execute when a new row is added to the orderDetails
	- check that there is enough stock else push error
*/

CREATE TRIGGER before_insert_orderDetails
BEFORE INSERT ON orderdetails
FOR EACH ROW
BEGIN
	DECLARE currentStock SMALLINT;
    DECLARE errorMsg VARCHAR(50);
    
    -- check the stock
	SELECT quantityInStock INTO currentStock
    FROM products
    WHERE productCode = NEW.productCode;
    
    IF (currentStock < NEW.quantityOrdered ) THEN
		-- error 
        SET errorMsg = CONCAT('Not enough inventory : ', NEW.quantityOrdered);
        
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = errorMsg; -- STOPS EVERYTHING
	ELSE
		-- Update the new quantity
		UPDATE products
		SET quantityInStock = ( quantityInStock - NEW.quantityOrdered )
		WHERE productCode = NEW.productCode;
    END IF;

END //


DELIMITER ;