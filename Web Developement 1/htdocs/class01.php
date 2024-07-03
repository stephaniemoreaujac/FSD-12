<!DOCTYPE html>
<html>
    <head>
        <title>My First PHP File</title>
    </head>
    <body>
        <h1>Hello World</h1>
        <p>Some text here</p>
        <?php
    
            // CREATING VARIABLES
            $myName; // declare a variable
            $myName = "Steph"; // initialize a variable
            $myOtherName = 'Moreau';

            // the only time I (personally) use single quotes for strings
            $myOtherName = 'Steph "the teacher" Moreau';

            $theYear = 2024; // interger
            $price = 7.95; // float

            $isLunchTime = false; // boolean

            $theYear = "Two thousand twenty-four"; // php is loosy language
        ?>
        <p>
            <?php 
                // OUTPUT TO SCREEN
                echo $myName;
                echo " also call me ";
                echo $myOtherName;
                echo " ";
                echo $theYear;
            ?>
        </p>
        <p>
            <?php
                // CONCATENATION
                $myOtherName = $myName . " also call me " . $myOtherName;
                echo $myOtherName . " " . $theYear;
            ?>
        </p>
        <h3>Hello <?php echo $myName; ?>!</h3>
        <h3>Hello <?= $myName ?>! - using shorthand echo</h3>
        <hr>
        <?php
            /* CONSTANT - best practice
                use the const keyword
                NO dollar sign $
                UPPERCASE NAME seperated by underscore _
                Initialize and declare
                Value never changes
            */

            const TRIO_NUGGETS = 10;
            const KIDS_NUGGETS = 4;

            $total = $price * TRIO_NUGGETS;
            echo "Total for nuggets: " . $total;

        ?>
        <hr>

        <h3>Fun with Numbers!</h3>
        <?php
            // INCREMENT / DECREMENT
            $wholeNumber = 20;
            echo $wholeNumber;
        ?><br>
        ++ is after <?= $wholeNumber++; ?><br>
        current val <?= $wholeNumber; ?><br>    
        ++is before <?= ++$wholeNumber; ?><br>
        current val <?= $wholeNumber; ?><br>    
        -- is after <?= $wholeNumber--; ?><br>
        current val <?= $wholeNumber; ?><br>    
        
        <hr>
     

        <?php 
        // ARRAYS (numerical index)

        // prefered way to create arrays
        $userInfo = array("Steph", "Teacher", 27, false);
        $userInfoA = ["Steph", "Teacher", 27, false];
        
        echo $userInfo[0] . "<br>"; // Steph
        echo $userInfo[1] . "<br>"; // Teacher
        echo $userInfo[2] . "<br>"; // 27
        echo $userInfo[3] . "<br>"; // "empty beccause false" - true will show 1
        echo $userInfo[4] . "<br>"; // ERROR - Undefined array key

        // Option B 
        $userInfoB[0] = "Steph";
        $userInfoB[11] = "Teacher";

        echo $userInfoB[0] . " is a " . $userInfoB[11] ."<br>";

        // Option C
        $userInfoC[] = "Steph";
        $userInfoC[] = "Montreal";

        echo $userInfoC[0] . " lives in " . $userInfoC[1] . "<br>";


        // OUTPUT ARRAY DATA
        echo $userInfoB; // Array
        echo "<pre>";
        var_dump( $userInfoB );
        print_r( $userInfoB );
        echo "</pre>";
        ?>
        <hr>
        <?php // ASSOCIATIVE ARRAYS

        $userAssoc = array(
                        "name" => "Steph",
                        "job" => "Teacher",
                        "age" => 27,
                        "isHealthy" => false
        );

        // OPTION B
        $indexName = "firstName";
        $userAssocB[ $indexName ] = "Steph";
        $userAssocB["job"] = "Teacher";

        echo $userAssoc["name"] . 
            " is a " . $userAssoc['age'] .' year old ' . 
            $userAssoc['job'];

            echo "<pre>";
            var_dump( $userAssocB );
            print_r( $userAssocB );
            echo "</pre>";
        
        ?>
<hr>
        <?php // MULTI-DIMENTIONAL ARRAYS

        $studentA  = array ("name" => "Alan", "id" => 123);
        $studentB  = array ("name" => "Julie", "id" => 558);
        $studentC  = array ("name" => "Arthur", "id" => 333);

        $students = array(
            "Alan" => array("name" =>"Alan", "id"=>123, "gpa"=>4),
            "Julie"=> array("name" =>"Julie", "id"=>234, "gpa"=>3.5, "alias" => $studentB),
            0 => array("name"=>"Henri", "id"=>369, "gpa"=>3.2),
            7265 => $studentC,
            "hasTeacher" => true
        );

        echo "<pre>";
        var_dump( $students );
        print_r( $students );
        echo "</pre>";

        // access multi-dimentional data
        echo $students["Julie"]["alias"]["id"];

        ?>
<!-- PRACTICE
// Create an associative array where the index are the names of the month and the value is the total number of days in that month.

// Create an associative array where the index is a dog breed and the values are the dog names of those breeds;
 - Rex = poodle
 - Toby = JackRussel
 - Muffin = Doberman
 - Cupcake = poodle
 - JackJack = poodle
 - Albert = Doberman
    -->
        <script>
            // NEED TO BE IN JAVASCRIPT LANGUAGE
        </script>
    </body>
</html>