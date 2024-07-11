<?php

    //require because I want to make sure that it load the styles properly
    require "includes/header.php";

?>

	<main id="pageContent">
		
		<div id="main">
			<article>
				<h1>Welcome to my homepage</h1>
				<?php if ($isUserLoggedIn){ ?>
					<h2>Hello <?=$_COOKIE['resumeName']; ?></h2>
				<?php } ?>
                <p>The current time is <?=time(); ?><p>
				<p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in ius, sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu mucius fabellas. Stet facilis ius te, quando voluptatibus eos in. Ad vix mundi alterum, integre urbanitas intellegam vix in.</p>
			</article>
		</div>
		<aside>
		    <?php
				for($i=1; $i<=1; $i++){
					echo "<div><img src=\"https://picsum.photos/300/150?{$i}\" alt=\"Home Photo {$i}\"></div>";
				} 
			?>		
        </aside>
	</main>

<?php

// include because not fatal is the page is not found
include "includes/footer.php";
?>