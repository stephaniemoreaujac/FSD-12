<?php 
// generate hashed password for our database
// echo password_hash("123123", PASSWORD_DEFAULT); die();

$pageTitle = "Login";
$errMessages = [];
$email = "";
$password = "";

require "includes/functions.php";

// TODO: simplify into one statement
loginRequired(!$isUserLoggedIn);
loginRequired(!$isSessLoggedIn);

// only validate a login on POST
if ( $_SERVER['REQUEST_METHOD'] == "POST"){

    // username
    if (validateIsEmptyText("txtLogin", $_POST)) array_push($errMessages, "Username can not be empty.");
    else    $email = $_POST['txtLogin'];

    // title
    if (validateIsEmptyText("txtPw", $_POST)) array_push($errMessages, "Password can not be empty.");
    else    $password = $_POST['txtPw'];
    
    if (empty($errMessages)) {
    // no error
        require "includes/meekro.php"; 

         // fetch user from db using meekrodb
        $user = DB::queryFirstRow("SELECT * FROM users WHERE email = %s", $email);
        // echo "<pre>";print_r($user);
       
        if ($user == null){
            // no user = error
            array_push($errMessages, "No user found"); // not the best error message - should just say login failed - safety
        }else{
            
            // no match = errors
            // if ($password == $user['pword']){ // would not work with hashed paswwrod
            if ( password_verify($password, $user['pword']) ){
                // passwords match = cookie
        
               // array_push($errMessages, "User {$user['first_name']} Exists");

               /*
               // user is logged in - setup cookies
               $expiration = time() + (60 * 60 * 24); // expiration = 1 day
               setcookie('resumeIsAuth', true, $expiration);
               setcookie('resumeName', $user['first_name'], $expiration);
// i do not have access to cookies here
*/
                // session variables
                $_SESSION['sessIsAuth'] = true;
                $_SESSION['sessName']   = $user['first_name'];

               header("Location: index.php");
               die();

            }else
                array_push($errMessages, "Invalid credentials");

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
						<input id="txtLogin" name="txtLogin" type="text" class="form-control" value="<?=$email; ?>">
					</div>

                    <div class="form-group">
						<label for="txtPw" class="control-label">Password</label>
						<input id="txtPw" name="txtPw" type="password" class="form-control">
                        <!-- no value no else because we do not want to repopluate the password - safety -->
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