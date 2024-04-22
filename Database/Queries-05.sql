-- CLASS 05

-- INDEX allow sql a much faster way to search and filter its data
-- create an index on the school_name column of the school table
CREATE INDEX idx_shool_name ON school (school_name);
-- remove index from school table
DROP INDEX idx_shool_name ON school;


CREATE VIEW RedStartDiecastProduct AS
	SELECT productCode, productName, quantityInStock, buyPrice, MSRP 
    FROM products 
    WHERE productVendor = 'Red Start Diecast';

SELECT * FROM RedStartDiecastProduct WHERE quantityInStock < 1000;

-- create view to easily identify product from specific vendor and low in stock
CREATE VIEW RedStartDiecastLowStock AS
	SELECT productCode, quantityInStock, buyPrice, MSRP 
    FROM products 
    WHERE productVendor = 'Red Start Diecast' AND quantityInStock < 1000;
    
SELECT * FROM RedStartDiecastLowStock;    
    
-- increase their low stock to 4000 = rewrite the entire VIEW  and SELECT statement
CREATE OR REPLACE VIEW RedStartDiecastLowStock AS
	SELECT productCode, quantityInStock, buyPrice, MSRP 
    FROM products 
    WHERE productVendor = 'Red Start Diecast' AND quantityInStock < 4000;

-- remove the VIEW
DROP VIEW RedStartDiecastLowStock;

