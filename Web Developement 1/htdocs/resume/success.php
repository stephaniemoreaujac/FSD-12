<?php
$pageTitle = "Success";

// if $_GET['fname'] does not exist then we send the user back to the form 
if (!array_key_exists('fname', $_GET)){
	header("Location: contact.php");
}

    //require because I want to make sure that it load the styles properly
    require "includes/header.php";

?>

<main id="pageContent">
	
	<div id="main">
		<h1>Form Success!!</h1>
		<article>
			<h2>Your form has been sent</h2>
			<p>Congrats <?=$_GET['fname']; ?> Your form has been submitted.</p>
			<!-- if fname does not exists, redirect user back to contact page -->
		</article>
	</div>
	<aside>
	<?php
			for($i=1; $i<=1; $i++){
				echo "<div><img src=\"https://picsum.photos/300/150?{$i}\" alt=\"School Photo {$i}\"></div>";
			} 
		?>
	</aside>
</main>

<?php

// include because not fatal is the page is not found
include "includes/footer.php";
?>