<?php
$pageTitle = "School";

    //require because I want to make sure that it load the styles properly
    require "includes/header.php";

?>

	<main id="pageContent">
		
		<div id="main">
			<h1>Schooling Information</h1>
			<article>
				<h2>Accusamus facere explicabo</h2>
				<p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in ius, sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu mucius fabellas. Stet facilis ius te, quando voluptatibus eos in. Ad vix mundi alterum, integre urbanitas intellegam vix in.</p>
			</article>
			<article>
				<h2>Dolores consequuntur</h2>
				<p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in ius, sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu mucius fabellas. Stet facilis ius te, quando voluptatibus eos in. Ad vix mundi alterum, integre urbanitas intellegam vix in.</p>
			</article>
			<article>
				<h2>Murbanitas intellegam vix</h2>
				<p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in ius, sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu mucius fabellas. Stet facilis ius te, quando voluptatibus eos in. Ad vix mundi alterum, integre urbanitas intellegam vix in.</p>
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