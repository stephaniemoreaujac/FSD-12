<?php
$pageTitle = "Contact";
$errors = []; // keep track of the errors from the form

/**
  * Validate the form text data is not empty 
  * @param string $formName The name of the form element
  * @param string $errorMessage The error message to display in case of error
  */
function validateText($formName, $errorMessage){
  global $errors; // needed to access the $errors outside the function
  
  // check that the array key exits in the $_POST superglobal
  if ( !array_key_exists($formName, $_POST) ){
    array_push($errors, $errorMessage);
    return;
  }
  
  // if the variable is a string datatype, we trim the whitespace
  if ( is_string( $_POST[$formName] ) ){
    $_POST[ $formName ] = trim($_POST[$formName]);
  }
  
  // if it is empty, we ouptput the error
  if ( empty( $_POST[$formName] ) ){
    array_push($errors, $errorMessage);
  }
}

/**
  * Check that string is withing specified length
  * @param string $strToCheck The string to be checked
  * @param int $minLength Minimum length allowed of the string to check
  * @param int $maxLength Maximum length allowed of the string to check
  * @return bool TRUE is the string is between the min and max inclusive
  */
function validateLength($strToCheck, $minLenght, $maxLength){
  
  if (strlen( $strToCheck ) < $minLenght || strlen( $strToCheck ) > $maxLength)
  return false;
  else 
  return true;
  
  // can be simplified to 
  // return ((strlen( $strToCheck ) >= $minLenght && strlen( $strToCheck ) <= $maxLength))
}


// check if page loaded via POST method
if ( $_SERVER['REQUEST_METHOD'] == "POST"){
  // echo "<pre>";
  // print_r($_POST);
  // print_r($_FILES);
  // echo "</pre>";
  
  // was happy checked?
  if ( !array_key_exists("happy", $_POST) ){
    // happy was NOT checked
    array_push( $errors, "You are supposed to be happy with the service!");
  }
  
  /*
    // causes error if the firstName is not found as a key of $_POST
    if ( $_POST['firstName'] == "")
    array_push( $errors, "You need a name");
  */
  
  // validateion for first name
  validateText("firstName", "Your first name is required");
  
  // validateion for last name
  validateText("lastName", "Your last name is required");
  
  // validateion for email address
  validateText("emailAdd", "Your email is required");
  if ( !filter_var( $_POST['emailAdd'], FILTER_VALIDATE_EMAIL ) )
  array_push($errors, "You must enter a valid email");
  
  // validateion for comments (html form element name is address but not relevant to content = CONFUSSION!!)
  validateText("address", "Your comments are required");
  if (!validateLength($_POST['address'], 5, 100) )
  array_push($errors, "You comment must be between 5 and 100 characters");
  
  // validateion for favorite foods
  validateText("favFoods", "You need to select some food");
  

  // File upload script for avatar - no error if no file found
  if ( array_key_exists("avatar", $_FILES) ){
    // there is a file waiting
    
    // check for errors
    if ( $_FILES['avatar']['error'] != 0){ // error occured
      if ( $_FILES['avatar']['error'] != 4) // ignore error if no file was uploaded
        array_push($errors, "File could not be uploaded");
    } else {
      // file was uploaded and no errors!!
      
      $source = $_FILES['avatar']['tmp_name']; // where is the file from
      $destination = "uploads/" .time() . $_FILES['avatar']['name'];  // where is the file going
      //added time so that we dont have to delete the file everytime
      
      // attempt to move the source file into the destination location
      $hasMoved = move_uploaded_file( $source, $destination);
      
      if (!$hasMoved){
        // file did not move
        array_push($errors, "The files could not be moved");
      }
    }
    
  }
  
  // upon success, move to the success page and say congrats to firstName
  if (empty($errors)){
    header("Location: success.php?fname={$_POST['firstName']}");
  }
  
} // end of  $_SERVER['REQUEST_METHOD'] == "POST"

//require because I want to make sure that it load the styles properly
require "includes/header.php";

?>
<main id="pageContent">
  <div id="main">
  <h1>Contact us!</h1>

  <?php if ( !empty($errors) ) { // check if the errors array has data ?>
    <article>
      <ul>
        <?php foreach ($errors as $e) echo "<li>{$e}</li>";  // output each item of the errors array ?>
      </ul>
    </article>
  <?php } // end of !empty($error) ?>
    
  <article>
    <!-- enctype required to submit "physical" data -->
    <form action="" method="POST" enctype="multipart/form-data" class="col-6 offset-3 mt-3">
      
      <!-- First & Last Name-->
      <div class="input-group  mb-3">
        <span class="input-group-text">First and last name</span>
        <input type="text" class="form-control" id="txtFirstName" name="firstName" >
        <input type="text" class="form-control" id="txtLastName" name="lastName" >
      </div>
      
      <!-- Email-->
      <div class="input-group mb-3">
        <label class="input-group-text" id="txtEmail">Email Address</label>
        <input type="text" class="form-control" id="txtEmail" name="emailAdd" >
      </div>
      
      <!-- Extra Comments textarea -->
      <div class="input-group mb-3">
        <label class="input-group-text" for="txtAddress">Additional Comments</label>
        <textarea class="form-control" name="address" id="txtAddress" required></textarea>
      </div>
      
      <!-- Happy checkbox-->
      <div class="input-group mb-3">
        <div class="input-group-text">
        <input class="form-check-input mt-0" type="checkbox" name="happy" id="chkHappy">
        </div>
        <label class="form-control" for="chkHappy">Are you happy with the service? </label>
      </div>
      
      <!-- Foods Select-->
      <div class="input-group mb-3">
        <label class="input-group-text" for="selFoods">Favorite Foods</label>
        <select class="form-select" id="selFoods" name="favFoods[]" multiple>
          <option value="carrot">Carrots</option>
          <option value="cucumber">Cucumber</option>
          <option value="Apple">Apple</option>
          <option value="pear">Pear</option>
        </select>
      </div>
      
      <!-- Avatar file upload -->
      <div class="input-group mb-3">
        <input type="file" class="form-control" id="fileAvatar" name="avatar">
      </div>

      <input type="submit" class="btn btn-primary btn-lg mt-3">
    </form>
      
      
    </article>
    
    
  </div>
  <aside>
    <?php
    for($i=1; $i<=4; $i++){
      echo "<div><img src=\"https://picsum.photos/300/150?{$i}\" alt=\"School Photo {$i}\"></div>";
    } 
    ?>
  </aside>
</main>
  
<?php
  
  // include because not fatal is the page is not found
  include "includes/footer.php";
?>