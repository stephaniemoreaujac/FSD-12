<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <title><?= (isset($pageTitle) ? $pageTitle . " | " : "" ) . "StephMoreau"; ?></title> -->
     <title><?php
        //isset checks that the value exists
        if (isset($pageTitle)){
            echo "{$pageTitle} | ";
        }
        echo "StephMoreau";
    ?></title>
    <meta name="description" content="Dynamic Resume">
    <link rel="stylesheet" href="styles/style.css">
</head>

<body>
	<header>
		<h1 id="logo"><img src="images/logo.png" alt="my logo">Steph Moreau</h1>
		<nav>  
			<ul>
				<li><a href="index.php">Home</a>
				<li><a href="portfolio.php">Portfolio</a>
				<li><a href="school.php">School</a>
				<!-- <li><a href="#">Experience</a> -->
			</ul>
		</nav>
		<p><strong>It is not a bug, it is an undocumented feature!</strong></p>
	</header>