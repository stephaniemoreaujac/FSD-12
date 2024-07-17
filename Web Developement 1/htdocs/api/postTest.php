<?php 
/* Attempt to use CURL with POST data */

$endPoint = "http://localhost/fatfree/portfolio/add";
$postData = ['title'=>'Curl request', 'content'=>'This is a curl test request', 'public'=>1];

// initialize curl
$ch = curl_init(  $endPoint );

// configure curl

// prevent output to the screen
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// set curl to use POST method
curl_setopt( $ch, CURLOPT_POST, true);

// set the POST variables
curl_setopt( $ch, CURLOPT_POSTFIELDS, $postData);   

// execute curl
$resp = curl_exec( $ch );

// response
