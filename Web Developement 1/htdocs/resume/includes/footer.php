<footer>
		<p>&copy; <?=date('Y'); ?> | <a href="#">Valid HTML</a> | <a href="#">Valid CSS</a></p>
		<address>
			Contact: 
			<a href="contact.php">Write to me</a> | <?php include "email.txt"; // because include/require does not have to be php file ?>
			<?php if ($isUserLoggedIn || $isSessLoggedIn){ ?>
				<br><a href="portfolio_edit.php">Create Portfolio Item</a> | 
				<a href="logout.php">Logout</a>
			<?php } else{ // not logged in ?>
				<a href="login.php">Login</a>
			<?php } ?>
		</address>
	</footer>

	<script src="js/script.js"></script>
</body>

</html><!-- SOURCE: https://html5-templates.com/ -->