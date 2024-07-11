<?php 

// load the composer required libraries
require "vendor/autoload.php";


$f3 = Base::instance(); // load the framework

// set route
$f3->route('GET /', function(){
    echo "It's working!!!";
});

$f3->route('GET /about', function(){
    echo "about me!!";
});

$f3->route('GET /details/@singleId', function ($f3, $params){
    echo "More details about " . $params['singleId'];
    echo "<Br><Br>";
    echo "Another way to grab data " . $f3->get('PARAMS.singleId');
});

$f3->route('GET /details/@data/@other', function($f3, $params){
    echo "We have {$params['data']} and we have {$params['other']}...";

    if ($params['other'] == "stuff"){
        echo "We got lots of stuff";
    }
});

$f3->run();