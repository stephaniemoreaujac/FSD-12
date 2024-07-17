<?php 

// get the  pokemon id/name
$poke_id = $_GET['id'] ?? null;

if ($poke_id == null){
	echo "Invalid Pokemon";
	die();
}

$baseUrl = "https://pokeapi.co/api/v2/";
$endPoint = $baseUrl . "pokemon/" .$poke_id;

// initialize curl
$ch = curl_init( $endPoint );

// configure curl
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

// execute curl
$resp = curl_exec( $ch );

if ($resp === "Not Found"){
	echo "Invalid Pokemon";
	die();
}
// convert response
$pokemon = json_decode( $resp );

?><html lang="en">

<head><!-- source: https://codepen.io/Fluskys/pen/poNWYry -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Pokemon</title>
	<link href="styles/pokemon.css" rel="stylesheet">
</head>

<body>
	<h1 id="Page-Title">Pokemon API fetch example</h1>

	<div class="container">

		<div class="pokemons-card" id="pokemons-card">
			<h5 id="pokemon-name"><?=$pokemon->name; ?></h5>
			<img src="<?=$pokemon->sprites->front_default; ?>" width="100px">
			<div class="abilities" id="abilities">
				<p class="abilities-names">Abilities</p>
				<ul>
					<?php foreach ($pokemon->abilities as $a){ ?>
						<li><?=$a->ability->name; ?></li>
					<?php } ?>
				</ul>
			</div>
			<div class="types" id="types">
				<p class="types-names">Types</p>
				<ul>
					<?php foreach ($pokemon->types as $t){ ?>
						<li><?=$t->type->name; ?></li>
					<?php } ?>
				</ul>
			</div>
		</div>
		`
	</div>

</body>

</html>