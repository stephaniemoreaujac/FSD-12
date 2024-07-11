<?php 
 require "includes/dbConnect.php";
 loginRequired( ($isUserLoggedIn || $isSessLoggedIn) );

    // check if the pid is in the query string
    if (!array_key_exists( "pid", $_GET)){
        header("Location: portfolio.php?msg=Item unavailable");
        die(); // cause script to stop immediatly 
    }

    // setup our query
    $sql = "SELECT * FROM portfolio WHERE id = :id";
    $prep = $db->prepare( $sql );
    $sql_variables = ["id" => $_GET['pid'] ]; // associate array of values to replace 
    $prep->execute( $sql_variables );

    $item = $prep->fetch(); // the results of the query, fetch = single row

    if (!$item){ // nothing found in the database
        header("Location: portfolio.php?msg=Item not found");
        die();    
    }elseif ($item['public'] != 1){
        header("Location: portfolio.php?msg=Permission not granted to delete");
        die();    
    }

   // DELETE THE RECORDS FROM THE DATABASE
   $sql = "DELETE FROM portfolio WHERE public=1 AND id = :id";
   $prep = $db->prepare( $sql );
   // $sql_variables is the same as above so we don't NEED to redeclare it 
   $prep->execute( $sql_variables );
   
   header("Location: portfolio.php?msg=Item was deleted");
   die();