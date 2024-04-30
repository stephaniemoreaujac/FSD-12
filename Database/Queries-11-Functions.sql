-- CLASS 11 USER DEFINED FUNCTIONS
DROP FUNCTION fnOwnerName;
DROP FUNCTION fnRandomEmployee;
DROP FUNCTION fnEmployeePhone;
DROP FUNCTION fnGoodCredit;
DROP FUNCTION fnCalcTotalOf;

-- allows us to use the ; in our functions
DELIMITER //

-- fetch owner (myself) name
CREATE FUNCTION fnOwnerName()
RETURNS VARCHAR(10) DETERMINISTIC
BEGIN
	RETURN 'Steph';
END //

-- fetch random employee
CREATE FUNCTION fnRandomEmployee()
RETURNS INT NOT DETERMINISTIC
BEGIN
	-- create variable to manipulate within our function
	DECLARE randomEmployeeId INT;
	
    SELECT employeeNumber INTO randomEmployeeId
    FROM employees
    ORDER BY RAND()
    LIMIT 1;

	RETURN randomEmployeeId;

END //

-- fetch given employees full phone number
CREATE FUNCTION fnEmployeePhone(argEmployeeId INT)
RETURNS VARCHAR(60) NOT DETERMINISTIC
BEGIN
	DECLARE employeesFullPhone VARCHAR(60);
    
    SELECT CONCAT(offices.phone, employees.extension) INTO employeesFullPhone
    FROM employees
    JOIN offices ON employees.officeCode = offices.officeCode
    WHERE employees.employeeNumber = argEmployeeId;

	RETURN employeesFullPhone;

END //

-- determine good standing
CREATE FUNCTION fnGoodCredit(argCredit DECIMAL(10,2))
RETURNS VARCHAR(10) DETERMINISTIC
BEGIN
	DECLARE returnString VARCHAR(10);
    
    IF argCredit < 7000 THEN
		SET returnString = 'Bad';
	ELSEIF argCredit < 150000 THEN
		SET returnString = 'Ok';
	ELSEIF argCredit >= 150000 THEN
		SET returnString = 'Great';
	END IF;
    
    RETURN returnString;

END //


-- Create a function fnCalTotalOf
-- It will calculate the total price given the unit price and the number of units
CREATE FUNCTION fnCalcTotalOf(argPrice DECIMAL(10, 2), argUnit INT)
RETURNS DECIMAL(12,2) DETERMINISTIC
BEGIN
	DECLARE totalPrice DECIMAL(12,2);
    
    SET totalPrice = argPrice * argUnit;
    
    RETURN totalPrice;

END //

 DELIMITER ;