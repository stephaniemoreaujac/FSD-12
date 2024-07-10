<?php 
// all things meekrodb

// composer to automatically load the library
require_once "vendor/autoload.php";


DB::$dbName = 'fsd12_resume';
DB::$user = 'fsd_user';
DB::$password = 'chicken';
DB::$port = 3306; // may not be required if already on port 3306
