<?php 
/**
 * Controller class that handles all non-transactional pages 
 * (no database connection)
 */
class Pages extends Controller{
    /**
     *  GET Homepage 
     */
    function homepage($f3){
        echo Template::instance()->render('homepage.html');
    }

    /**
     * GET about me page
     */
    function about($f3){
        /*
        $home_route = $f3->get('BASE') . $f3->alias('home');

        echo "My controller about page";
        echo "<a href='{$home_route}'>Home</a>";
        */
        // $f3->set('pageTitle', "About");
        $this->setPageTitle("About");
        
        $f3->set('aboutName', 'Steph');
        echo Template::instance()->render('demo/about.html');
    }

    /**
     * GET details page with only a single argument
     */
    function details1Arg($f3, $params){
        /*
        echo "More details about " . $params['singleId'];
        echo "<Br><Br>";
        echo "Another way to grab data " . $f3->get('PARAMS.singleId');
        */
        $f3->set('pageTitle', "Single");
        $f3->set('single', $params['singleId']);
        echo Template::instance()->render('demo/single.html');
    }

    /**
     * GET details page with 2 arguments
     */
    function details2Arg($f3, $params){
        /*
        echo "We have {$params['data']} and we have {$params['other']}...";
    
        if ($params['other'] == "stuff"){
            echo "We got lots of stuff";
        }
        */

        $f3->set('first', $params['data']);
        $f3->set('second', $params['other']);
        $f3->set('content', 'demo/double.html');
        echo Template::instance()->render("demo/demo_main.html");
    }
}