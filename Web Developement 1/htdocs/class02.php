<?php // PURE PHP 
/*
$age = 35;
$name = "Jeff"; // scoping does not require previsou declaration of variable.

echo "<h2>Hello World</h2>";

if ($age > 50) {
    echo "You are retired!";
    $name = "Alfred";
}else if ($age > 18){
    echo "You are an adult!";
    $name = "Jason";
}else{
    echo "You are a child.";
    $name = "Allison";
}

echo "<br> Nice to meet you " . $name;

// curly brackets optional with single statement
if ($age <= 2) echo "<br>Do not use sunscreen";

// ternary operator
$age = ($age > 10) ? ($age - 10) : ($age + 5); 
echo "<br> Your New Age : " . $age . "<br>";

echo ($age > 18) ? "Still adult" : "Now a child";

if (5 == "5") echo "<br>value are the same";
if (5 === "5") echo "<br>values and type are the same";
if (5 === 5) echo "<br>values and type are the same this time";

*/


/** LOOPS */
/*
const MAX_LOOP = 10;
$i = 0;

// while
while( $i++ < MAX_LOOP){
    echo $i . "...";
}
echo "-- end of while loop <br><br>";

do{
    echo $i ."...";
} while ($i++ < MAX_LOOP);
echo "-- end of dowhile loop<br><br>";

for ($x = 0; $x < MAX_LOOP; $x++){
    echo $x . "...";
}
echo "-- end of for loop <br><br>";

echo "MONKEYS" . "<br>";
$maxMonkeys = 5;
while ($maxMonkeys > 0){
    // output the monkeys count jumping
    echo $maxMonkeys . " little monkey" . ($maxMonkeys <= 1 ? "" : "s") . " jumping on the bed <br>";

    // one monkey fell off the bed
    $maxMonkeys--;

    // no more monkeys are on the bed
    if ($maxMonkeys == 0)
        echo "Put those monkeys back to bed";
}
*//*

$arrTotal = [2,3,6,1,8,0,2,10,3,5,7,1,2,3];

$userAssoc = array(
    "name" => "Steph",
    "job" => "Teacher",
    "age" => 27,
    "isHealthy" => true
);

$sum = 0;
foreach($arrTotal as $value){
    // value greater than 5 should be skipped
    if ($value > 5) continue;
    
    echo $value . " + ";
    $sum += $value;

    // total sum > 15 exit the loop
    if ($sum > 15) break;
}
echo "0 = " . $sum . "<br><br>";

foreach ($userAssoc as $key => $value){
    echo $key . " : " . $value . " <br> ";
}
*/

// range is a built-in function to create arrays filled with the given range of numbers
$outer = range(0,5);
$inner = range(5,7);

foreach ($outer as $o){
    echo "O{$o}";

    foreach ($inner as $i){
        echo "I{$i}";
        if ($i >= 6) continue;
        echo "--";
    }
    echo "<br>";
}

echo "<br><br>...the end of the page...";













/* if you have a PURE php page (no HTML)
we usually omit the closing ?> tag
*/