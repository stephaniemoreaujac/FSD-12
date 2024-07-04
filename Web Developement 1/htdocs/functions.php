<?php

/**
 * Output the current year
 */
function showCurrentYear(){
    // echo date("Y"); // in case returnCurrentYear does not exist
    echo returnCurrentYear();
}
showCurrentYear();
echo "<br>";

/**
 * Return the current year
 * 
 * @return int curent Year
 */
function returnCurrentYear(){
    return date("Y");
}
$cy = returnCurrentYear();
echo $cy;
echo "<br>";

/**
 * Show the value of a future year
 *  
 * @param int $futureCount The number of years to calculate
 * @return int The value of the future year
 */
function returnNextYear($futureCount){

    $cy = returnCurrentYear();
    return $cy + $futureCount;

}
echo returnNextYear(2);
echo "<br>";
echo returnNextYear(4);
echo "<br>";


/**
 * Output a year in the future
 * @param int $futureCount The number of years to be calculate
 * @param bool $addBr (optional) Indicates if we add a <br>
 */
function showNextYear($futureCount, $addBr = true){
    echo returnNextYear($futureCount);
    if ($addBr) echo "<br>";
}

showNextYear(5);
showNextYear(7);


/**
 * Return a year in the future
 * @param int $futureCount The number of years to be calculated
 * @param bool $hasOutput (optional) Indicates if we add an echo
 * @param bool $addBr (optional) Indicates if we add a <br>
 * @return int The future year
 */
function nextYear($futureCount, $hasOutput = false, $addBr = true){
    $fy = date('Y') + $futureCount;
    if ($hasOutput){
        echo $fy;

        if ($addBr) echo "<br>";
    }

    return $fy;
}


$var = nextYear(20, true);
echo $var;

echo nextYear(20, true);
// echo $var;

nextYear(20, true, false);
echo "---";