SELECT * FROM offices;

UPDATE offices SET state = 'MA' WHERE officeCode = 4;

SELECT * FROM offices;

-- allow the user to update the specified table
GRANT UPDATE ON classicmodels.customers TO only_select@'%';

-- prevent the user from accessing the specified table
REVOKE USAGE ON classicmodels.payments FROM only_select@'%';

-- view all priviledges for the specified user (Thank you Danny!)
SHOW GRANTS FOR only_select@'%';

-- allow specific permissions, on specific tables, to a specific user
GRANT 
	SELECT (`officeCode`, `city`, `phone`), 
	UPDATE (`city`) 
	ON `classicmodels`.`offices` 
	TO 'only_select'@'%';
    
SELECT PASSWORD('123123'); -- get the password hash
CREATE USER 'demo'@'%' IDENTIFIED WITH mysql_native_password AS '*E56A114692FE0DE073F9A1DD68A00EEB9703F3F1';

-- allow new user spefic access
GRANT SELECT ON classicmodels.offices TO demo@'%';
GRANT SELECT (customerNumber, customerName)
	ON classicmodels.customers
    TO demo@'%';