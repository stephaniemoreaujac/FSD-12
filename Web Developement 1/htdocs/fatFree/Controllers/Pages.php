<?php 
/**
 * Controller class that handles all non-transactional pages 
 * (no database connection)
 */
class Pages{
    /**
     *  GET Homepage 
     */
    function homepage($f3){
        // route alias (nickname)
        $about_route = $f3->get('BASE') . $f3->alias('about');
        $single_route = $f3->get('BASE') . $f3->alias('detailSingle', ['singleId' => 'data']);
        $double_route = $f3->get('BASE') . $f3->alias('detailDouble', 'data=1111,other=22222');

        echo "This is my home page!!";
        echo "<a href='{$about_route}'>About</a>";
        echo "<a href='{$single_route}'>Deails Single</a>";
        echo "<a href='{$double_route}'>Deails Double</a>";
    }

    /**
     * GET about me page
     */
    function about($f3){
        $home_route = $f3->get('BASE') . $f3->alias('home');

        echo "My controller about page";
        echo "<a href='{$home_route}'>Home</a>";
    }

    /**
     * GET details page with only a single argument
     */
    function details1Arg($f3, $params){
        echo "More details about " . $params['singleId'];
        echo "<Br><Br>";
        echo "Another way to grab data " . $f3->get('PARAMS.singleId');
    }

    /**
     * GET details page with 2 arguments
     */
    function details2Arg($f3, $params){
        echo "We have {$params['data']} and we have {$params['other']}...";
    
        if ($params['other'] == "stuff"){
            echo "We got lots of stuff";
        }
    }
}