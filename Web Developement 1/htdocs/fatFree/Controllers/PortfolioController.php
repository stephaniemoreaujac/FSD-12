<?php
/**
 * Controller for the portfolio items
 */

 class PortfolioController extends Controller{

    private $model; // database object

    public function __construct($f3){
        // execute parent constructor
        parent::__construct($f3);
        
        $this->model = new Portfolio(); // establish database connection    
    }

    /**
     * Listing all the portfolio items
     */
    public function listing(){
        
        // fetch only the public items
        $items = $this->model->fetchPublic();

        $this->f3->set('results', $items);
        $this->setPageTitle("Portfolio Listing");
        echo $this->template->render("portfolio/listing.html");
    }

    /**
     * Listing of portfolio item
     */
    public function single(){

        // fetch real db data
        $item = $this->model->fetchById( $this->f3->get('PARAMS.pid') );

        // redirect if does not exist or if private (and not logged in)
        if (!$item || $item['public']!=1){
            $this->f3->reroute('@portfolio');
        }

        // exists = setup the view variables
        $this->f3->set("item", $item);
        $this->setPageTitle($item['title']);

        echo $this->template->render("portfolio/single.html");
        
    }

    /**
     * Delete a given item
     */
    public function delete(){
        // TODO: Addtional validate should confirm the user wants to delete

        // TODO: check if it exists and perform constraint

        // remove from database
        $this->model->deleteById( $this->f3->get('PARAMS.pid') );

        // redirect user
        $this->f3->reroute('@portfolio');


    }

    /**
     * Setup the form to update an existing item
     */
    public function edit(){
        // TODO: create method to not repeat ourselves
        // fetch real db data
        $item = $this->model->fetchById( $this->f3->get('PARAMS.pid') );

        // redirect if does not exist
        if (!$item){
            $this->f3->reroute('@portfolio');
        }
        
        $this->f3->set('item', $item);
        $this->setPageTitle("Edit Portfolio");
        echo $this->template->render("portfolio/form.html");
    }

    /**
     * validate and update an existing item
     */
    public function editSave(){
        if ($this->isFormValid()){
            // check that item id exists
unset($_POST['content']);
            // save and reroute
            $itemId = $this->f3->get("PARAMS.pid");
            $this->model->updateById( $itemId );
            $this->f3->reroute("@portfolioSingle(@pid={$itemId})");
        }
    }

    /**
     * setup the form to add a new item
     */
    public function add(){
        $data = ['content'=>'', 'title'=>'', 'public'=>1];
        $this->f3->set('item', $data);

        $this->setPageTitle("Edit Portfolio");
        echo $this->template->render("portfolio/form.html");
    }

    /**
     * Validate and create a new item
     */
    public function addSave(){
        if ($this->isFormValid()){
            // save and reroute
            $itemId = $this->model->addItem();
            $this->f3->reroute("@portfolioSingle(@pid={$itemId})");
        }
    }

    /**
     * Validate the data for the form after a POST method
     * If nay date does not pass validation, the form is shown and false is returned
     * @return boolean TRUE if the form is valid
     */
    private function isFormValid(){

        $errors = [];
        // validate the title
        if (trim($this->f3->get('POST.title')) == ""){
            array_push($errors, "Title is not valid");
        }
        if (trim($this->f3->get("POST.content")) == ""){
            array_push($errors, "Content is not valid");
        }

        if (empty($errors)){
            return true;
        } else {
            $this->f3->set("item", $this->f3->get("POST"));

            $this->f3->set("errors", $errors);
            echo $this->template->render("portfolio/form.html");
            return false;
        }
    }
 }