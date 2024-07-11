<?php 
// in order to use session variables, we must always start a session
session_start();

// flag to know if user is logged in
$isUserLoggedIn = (array_key_exists("resumeIsAuth", $_COOKIE) && $_COOKIE['resumeIsAuth'] == true);
$isSessLoggedIn = (array_key_exists("sessIsAuth", $_SESSION) && $_SESSION['sessIsAuth'] == true);

// user-defined functions

/**
 * Validate is the value if empty
 * TODO: if no array provided, check only $key value
 * @param String $key 
 * @param Array $array
 * @return bool
 */
function validateIsEmptyText($key, $array){

    if (!array_key_exists($key, $array) || trim($array[$key]) == "" ){
        return true;
    } else { 
        return false;
    }

}

/**
 * Redirect the user if they are not logged in
 * @param boolean $loginFlag
 */
function loginRequired($loginFlag){
    // if the login is not true then redirect
    if ($loginFlag != true){
        header("Location: index.php");
        die();
    }
}