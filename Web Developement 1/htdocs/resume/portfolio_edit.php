<?php 
$pageTitle = "Modificatin Portfolio Item";

require "includes/dbConnect.php";
loginRequired( ($isUserLoggedIn || $isSessLoggedIn) );

// variables for script
$errMessages = [];
$pid = "";
$txtTitle = "";
$txtDesc = "";
$chkPublic = "checked"; // checked by default


// check for the post method
if ( $_SERVER['REQUEST_METHOD'] == "GET"){

    // check if the PID exists
    if ( array_key_exists("pid", $_GET) ){

        // exists = fetch single data database
        $query = $db->prepare( "SELECT * FROM portfolio WHERE id = :pid" );
        $query->execute( [ "pid" => $_GET['pid'] ] );

        $item = $query->fetch(); // get info from database

        if ($item){
            // data found in the database, populate variables
            $pid = $item['id'];
            $txtTitle = $item['title'];
            $txtDesc = $item['content'];
            $chkPublic = ($item['public']) ? "checked" : "";

            $pageTitle = "Update portfolio Item";
        }

        // populate the form
    }

}else if ( $_SERVER['REQUEST_METHOD'] == "POST"){
    // form was submitted


    // validate data
        // if error occurs tell the user

    // title
    if (validateIsEmptyText("title", $_POST))
        array_push($errMessages, "Title is not valid.");
    else
        $txtTitle = $_POST['title'];

    // additionl comments
    if (validateIsEmptyText("desc", $_POST))
        array_push($errMessages, "Comments are not valid.");
    else
        $txtDesc = $_POST['desc'];
    
    // public checkbox
    $chkPublic = array_key_exists("public", $_POST) ? "checked" : "";
    
    // pid
    $pid = array_key_exists("pid", $_POST) ? $_POST['pid'] : "";
    
    // check for any errors?
    if (empty($errMessages)){
        // insert or update database

        // populate common data for insert and update statements
        $data = [
            "title" => $txtTitle,
            "desc"  => $txtDesc,
            "public"=> ($chkPublic=="checked")?1:0
        ];

        if ( array_key_exists("pid", $_POST) ){
            // UPDATING
            $sql = "UPDATE portfolio SET title = :title, content = :desc, public = :public WHERE id = :pid";
            $data['pid'] = $pid;
        } else {
            // INSERTING
            $sql = "INSERT INTO portfolio (title, content, public) VALUES (:title, :desc, :public);";
        }
        $query = $db->prepare($sql);
        $query->execute( $data );
        if ($pid == "")
            $pid = $db->lastInsertId();

        if ($chkPublic=="checked"){
            // redirect to single page
            header("Location: portfolio_single.php?pid={$pid}");
        } else{
            // redirect to listing page with message;
            header("Location: portfolio.php?msg=Private portfolio item completed");
        }

        die();


        // redirect to the individual item

    }
}

require "includes/header.php";
?>
	<main id="pageContent">
		
		<div id="main">
			<h1>Portfolio</h1>
			
            <?php if ( !empty($errMessages) ) { ?>
                <p class="messages"><?=implode("<br>", $errMessages); ?></p>
            <?php } ?>

			<form action="" method="POST" class="col-6 offset-3 mt-3">
                <input type="hidden" name="pid" value="<?=$pid; ?>">
				
				<!-- Title-->
				<div class="input-group mb-3">
				  <label class="input-group-text" id="txtTitle">Portfolio Title</label>
				  <input type="text" class="form-control" id="txtTitle" name="title" value="<?=$txtTitle; ?>">
				</div>
				
				<!-- Description -->
				<div class="input-group mb-3">
				  <label class="input-group-text" for="txtDesc">Additional Comments</label>
				  <textarea class="form-control" name="desc" id="txtDesc"><?=$txtDesc; ?></textarea>
				</div>
				
				<!-- public checkbox-->
				<div class="input-group mb-3">
				  <div class="input-group-text">
				  <input class="form-check-input mt-0" type="checkbox" name="public" id="chkPublic" <?=$chkPublic; ?>>
				  </div>
				  <label class="form-control" for="chkPublic">Is this item public? </label>
				</div>
		  
				<input type="submit" class="btn btn-primary btn-lg mt-3">
			  </form>

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