<?php 
$pageTitle = "Login";
$errMessages = [];
$email = "";

/*
Assignment 1 - 5%
- implement the password form element
- validate the elements are not empty
- validate the passwords match (NOT IN A QUERY - in php)
- only login.php needs to be submitted
 (if using function in other files, make sure the names make sense!!)
*/

// only validate a login on POST
if ( $_SERVER['REQUEST_METHOD'] == "POST"){
    // TODO: error checking - from values filled
    
    $email = $_POST['txtLogin'];

    if (empty($errMessages)) {
    // no error
        require "includes/meekro.php"; 

         // fetch user from db using meekrodb
        $user = DB::queryFirstRow("SELECT * FROM users WHERE email = %s", $email);
        // echo "<pre>";print_r($user);
       
        if ($user == null){
            // no user = error
            array_push($errMessages, "No user found");
        }else{
            // passwords match = cookie
            // no match = errors
            array_push($errMessages, "User {$user['first_name']} Exists");
        }
        
    }
}

require "includes/header.php";
?>
	<main id="pageContent">
		
		<div id="main">
			<h1>Login Page</h1>

			<div class="row">
				<form class="col-sm-6 col-sm-offset-3" action="login.php" method="post">
                <?php if ( !empty($errMessages) ) { // TODO: make this a function ?>
                    <p class="messages"><?=implode("<br>", $errMessages); ?></p>
                <?php } ?>

					<div class="form-group">
						<label for="txtLogin" class="control-label">Username</label>
						<input id="txtLogin" name="txtLogin" type="text" required="required" class="form-control">
					</div>

					<div class="form-group">
						<button name="btnSubtmi" type="submit" class="btn btn-primary">Submit</button>
					</div>
				</form>
			
			</div>
			
		</div>
		<aside>
			<div><img src="https://picsum.photos/300/150?1" alt="Random Photo 1"></div>
			<div><img src="https://picsum.photos/300/150?2" alt="Random Photo 2"></div>
			<div><img src="https://picsum.photos/300/150?3" alt="Random Photo 3"></div>
		</aside>
	</main>
    <?php

// include because not fatal is the page is not found
include "includes/footer.php";
?>