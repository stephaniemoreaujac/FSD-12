<?php 

// load the composer required libraries
require "vendor/autoload.php";


$f3 = Base::instance(); // load the framework

// framework to automatically load the classes within 
$f3->set('AUTOLOAD', 'Controllers/');

// framework to automatically load the templates (VIEWS) within
$f3->set("UI", "Views/");

// debugging
$f3->set("DEBUG", 1);

// set route
$f3->route('GET @home: /', 'Pages->homepage');

$f3->route('GET @about: /about', 'Pages->about');

$f3->route('GET @detailSingle: /details/@singleId', 'Pages->details1Arg');

$f3->route('GET @detailDouble: /details/@data/@other', 'Pages->details2Arg');

// PORTOFOLIO CRUD
$f3->route("GET @portfolio: /portfolio", 'PortfolioController->listing');

$f3->route("GET @portfolioAdd: /portfolio/add", 'PortfolioController->add');
$f3->route("POST @portfolioAdd: /portfolio/add", 'PortfolioController->addSave');

$f3->route("GET @portfolioEdit: /portfolio/@pid/edit", 'PortfolioController->edit');
$f3->route("POST @portfolioEdit: /portfolio/@pid/edit", 'PortfolioController->editSave');

$f3->route("GET @portfolioDelete: /portfolio/@pid/delete", 'PortfolioController->delete');

$f3->route("GET @portfolioSingle: /portfolio/@pid", 'PortfolioController->single');

$f3->run();