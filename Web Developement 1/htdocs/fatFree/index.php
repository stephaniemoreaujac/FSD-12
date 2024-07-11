<?php 

// load the composer required libraries
require "vendor/autoload.php";


$f3 = Base::instance(); // load the framework

// framework to automatically load the classes within 
$f3->set('AUTOLOAD', 'Controllers/');

// set route
$f3->route('GET @home: /', 'Pages->homepage');

$f3->route('GET @about: /about', 'Pages->about');

$f3->route('GET @detailSingle: /details/@singleId', 'Pages->details1Arg');

$f3->route('GET @detailDouble: /details/@data/@other', 'Pages->details2Arg');

$f3->run();