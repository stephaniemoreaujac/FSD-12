<?php 

// GET the city
$cityName = $_GET['city'] ?? 'Ottawa';

// build out API url

$baseUrl = "http://api.weatherapi.com/v1/";	//API base url

$endPoint = $baseUrl . "current.json?"; // current forecast

$endPoint .= "key=d601d333317f4a5f97f31011233010" . "&"; // api key
$endPoint .= "q=" . $cityName . "&"; // query

// initilize our request
$ch = curl_init( $endPoint );

// configure our request - POST DATA, HEADER, Return method
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true ); // return as a string instead of output
// ** issues with the SSL certificates
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

// send the request
$results = curl_exec( $ch ); // resutls will contain a string
// echo $results; die(); // prints out a string!

// convert the response - string into json
$weather = json_decode( $results );

if (isset($weather->error)){
	echo $weather->error->message;
	die();
}

?><html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Weather</title>
    <link href="styles/weather.css" rel="stylesheet"><!-- template source: https://codepen.io/_Sabine/pen/QzzBve-->
</head>
<body>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

<div class="frame">
	<div class="location"><?=$weather->location->name; ?></div>
  <div class="front">
		<div>
			<div class="condition">
				<img src="<?=$weather->current->condition->icon; ?>" alt="<?=$weather->current->condition->text; ?>">
			</div>
			<div class="temperature">
				<?=round($weather->current->temp_c); ?>&deg;
			</div>
			<div>
				<div class="info">
					<i class="fas fa-wind"></i> <?=$weather->current->wind_dir." ".round($weather->current->wind_kph); ?> km/h <br> 
					<i class="fas fa-tint"></i> <?=$weather->current->humidity; ?>%
				</div>

			</div>
		</div>

	</div>
</div>
<div class="bottom"">
	<a href="?city=montreal">Montreal</a>
	<a href="?city=toronto">Toronto</a>
	<a href="?city=vancouver">Vancouver</a>
</div>







</body>
</html>