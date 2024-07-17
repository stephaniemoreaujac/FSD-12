<?php
	require "includes/dbConnect.php";

    // check if the pid is in the query string
    if (!array_key_exists( "pid", $_GET)){
        header("Location: portfolio.php");
        die(); // cause script to stop immediatly 
    }

    // setup our query
    $sql = "SELECT * FROM portfolio WHERE public=1 AND id = :id";
    $prep = $db->prepare( $sql );
    $sql_variables = ["id" => $_GET['pid'] ]; // associate array of values to replace 
    $prep->execute( $sql_variables );

    $item = $prep->fetch(); // the results of the query, fetch = single row

    if (!$item){ // nothing found in the database
        header("Location: portfolio.php");
        die();    
    }

	$pageTitle = $item['title'] . " | Portfolio";
    
    //require because I want to make sure that it load the styles properly
    require "includes/header.php";

?>

	<main id="pageContent">
		
		<div id="main">
			<h1>Portfolio</h1>
			
				<article>
					<h2><?=$item['title']; ?></h2>
					<p><?=nl2br($item['content']); ?></p>
					<p>
                        <a href="portfolio_single.php?pid=<?=$item['id']; ?>">View</a>
                        <?php if ($isUserLoggedIn || $isSessLoggedIn){ ?>
                            | <a href="portfolio/<?=$item['id']; ?>/edit">Edit</a> |
                            <a href="portfolio_delete.php?pid=<?=$item['id']; ?>">Delete</a>
                            <!-- we should confirm with the user before deleting -->
                        <?php } ?>
                    </p>
				</article>
			

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