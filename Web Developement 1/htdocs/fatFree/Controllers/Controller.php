<?php 
// parent controller class

class Controller{

    protected $f3;
    protected $template;

    /**
     * Parent constructor setup common elements and value
     * @param object $f3 Instance of the FatFreeFramework
     */
    function __construct($f3) {
        $this->f3 = $f3; // f3 instance to be used
        
        // setup of page title
        $f3->set('pageTitle', $f3->get('SITENAME'));
        // setup errors variables used on several pages
        $f3->set("errors", null);

        // setup template
        $this->template = new Template;
    }


    /**
     * Setup up the page title. Appends to existsin pageTitle
     * @param string $title New title to append
     */
    public function setPageTitle($title){
        $currentTitle = $this->f3->get('pageTitle');
        $newTitle = $title;

        if ($currentTitle != ""){
            // append string
            $newTitle .= " | ". $currentTitle;
        }

        $this->f3->set('pageTitle', $newTitle);


    } 
}