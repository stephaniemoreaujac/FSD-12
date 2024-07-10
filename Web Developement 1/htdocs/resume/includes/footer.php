<footer>
		<p>&copy; <?=date('Y'); ?> | <a href="#">Valid HTML</a> | <a href="#">Valid CSS</a></p>
		<address>
			Contact: 
			<a href="contact.php">Write to me</a> | <?php include "email.txt"; // because include/require does not have to be php file ?>
			<br><a href="portfolio_edit.php">Create Portfolio Item</a> | 
			<a href="login.php">Login</a>
			<!-- TODO: only allow authenticated users -->
		</address>
	</footer>

	<script src="js/script.js"></script>
</body>

</html><!-- SOURCE: https://html5-templates.com/ -->