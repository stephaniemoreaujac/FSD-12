<?php
// DATABSE CONNECTION PAGE

// database variables
$dbType = "mysql"; // type of database we are connecting to 
$dbServer = "localhost"; // host name of the databse server
$dbName = "fsd12_resume"; // name of my database
$dbPort = "3306"; // port to the database (check MAMP)
$dbUser = "fsd_user"; // user with access to the databse
$dbPass = "chicken"; // $dbUser password for the database

// connection string for PDO (PHP Database Object)
$dbConnection = "{$dbType}:host={$dbServer};dbname={$dbName};port={$dbPort}";

// open the connection to the database
$db = new PDO($dbConnection, $dbUser, $dbPass);

// include the user-defined functions
include_once "functions.php";

/*
// write SQL statements
$sql = "SELECT * FROM users";

// setting up the query
$query = $db->query( $sql );
// var_dump($query);

// fetch the results
$results = $query->fetchAll();
// echo "<pre>"; print_r($results);

if ($results){ // if not empty result set
    foreach ($results as $row){
        echo "Your first name is {$row['first_name']} <br>";
    }
}

// prepared sql statement protect from user given data
$user_id = 2;
$sql = "SELECT * FROM users WHERE id = :id";
$prep = $db->prepare( $sql );
$sql_data = ["id" => $user_id ]; // associate array of values to replace 
$prep->execute( $sql_data );


    */