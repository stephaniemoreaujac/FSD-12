<?php
	require "includes/dbConnect.php";

	// create php query
	$query = $db->query( "SELECT * FROM portfolio WHERE public=1");
	// setup the results
	$results = $query->fetchAll();

	$pageTitle = "Portfolio";
    //require because I want to make sure that it load the styles properly
    require "includes/header.php";

?>

	<main id="pageContent">
		
		<div id="main">
			<h1>Portfolio</h1>
			<?php
				// if $_GET['msg'] found then show them message
				if (array_key_exists("msg", $_GET)){
					echo "<p class='messages'>{$_GET['msg']}</p>";
				}
			?>

			<?php foreach ($results as $item){ //loop and show each portfolio item ?>
				<article>
					<h2><?=$item['title']; ?></h2>
					<p><?=nl2br($item['content']); ?></p>
					<p><a href="portfolio_single.php?pid=<?=$item['id']; ?>">View</a>
				</article>
			<?php } ?>

		</div>
		<aside>
			<?php
				for($i=1; $i<=3; $i++){
					echo "<div><img src=\"https://picsum.photos/300/150?{$i}\" alt=\"Random Photo {$i}\"></div>";
				} 
			?>
		</aside>
	</main>

<?php

// include because not fatal is the page is not found
include "includes/footer.php";
?>