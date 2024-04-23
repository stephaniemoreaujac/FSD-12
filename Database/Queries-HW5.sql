-- HW 5

-- orderCustomer = (*orderId, *customerId);
DROP TABLE IF EXISTS hw5_orderCustomer;
DROP TABLE IF EXISTS hw5_customer;
DROP TABLE IF EXISTS hw5_order;
DROP TABLE IF EXISTS hw5_item;

-- we use the backtick ` to denote literal values
CREATE TABLE hw5_item (
	`id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT,
    `status` VARCHAR(20)
);

CREATE TABLE hw5_order (
	id INT PRIMARY KEY AUTO_INCREMENT,
    itemId INT NOT NULL,
    
    CONSTRAINT FOREIGN KEY (itemId) REFERENCES hw5_item(id)
);

CREATE TABLE hw5_customer (
	id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(100),
    streetNumber INT,
    streetName VARCHAR(50)
);

CREATE TABLE hw5_orderCustomer(
	orderId INT,
    customerId INT,
    
    PRIMARY KEY (orderId, customerId), 
    CONSTRAINT FOREIGN KEY (orderId) REFERENCES hw5_order(id),
    CONSTRAINT FOREIGN KEY (customerID) REFERENCES hw5_customer(id)
);
    
    