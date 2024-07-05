<?php 

// COOKIES

// list all available cookies
echo "<pre>";
print_r($_COOKIE);

// create a cookie - will only be available next page load
setcookie("school", "JAC");
setcookie("name", "Peter");

// only cookie from the original page load
print_r($_COOKIE);

// using cookies
echo "Hello " . $_COOKIE['name'] . ". Do you do to " . $_COOKIE['school']."?";

// expiration time in seconds - current time + amount of seconds to expire
// use a time in the past (0 or time()-1) to remove cooki immediatly
$expiration = time() + (20);
// setcookie("Occupation", "teacher", $expiration);
