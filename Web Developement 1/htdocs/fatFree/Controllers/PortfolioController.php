<?php
/**
 * Controller for the portfolio items
 */

 class PortfolioController extends Controller{

    /**
     * Listing all the portfolio items
     */
    public function listing(){
        // fetch real data

        /* TODO: THIS IS DUMMY DATA TO BE REPLACE WHEN MODEL USED */
        $dummy = [ ['id'=>1, 'content'=>'lorem ipsum 111', 'title'=>'item title 111'],
            ['id'=>2, 'content'=>'lorem 
            ipsum 
            222', 'title'=>'item title 222'],
            ['id'=>3, 'content'=>'lorem ipsum 333', 'title'=>'item title 333'],
            ['id'=>4, 'content'=>'lorem ipsum 444', 'title'=>'item title 444'],
        ];
        $this->f3->set('results', $dummy);
        $this->setPageTitle("Portfolio Listing");
        echo $this->template->render("portfolio/listing.html");
    }

    /**
     * Listing of portfolio item
     */
    public function single(){

        // fetch real db data
        // redirect if does not exist

        /* TODO: THIS IS DUMMY DATA TO BE REPLACE WHEN MODEL USED */
        $dummy = ['id'=>$this->f3->get('PARAMS.pid'), 'content'=>'lorem ipsum 222', 'title'=>'item title 222'];

        $this->f3->set("item", $dummy);
        $this->setPageTitle($dummy['title']);

        echo $this->template->render("portfolio/single.html");
    }

    /**
     * Delete a given item
     */
    public function delete(){
        // Addtional validate should confirm the user wants to delete

        // check if it exists

        // remove from database

        // redirect user
        $this->f3->reroute('@portfolio');


    }

    /**
     * Setup the form to update an existing item
     */
    public function edit(){
        /* TODO: THIS IS DUMMY DATA TO BE REPLACE WHEN MODEL USED */
        $dummy = ['id'=>$this->f3->get('PARAMS.pid'), 'content'=>'lorem ipsum 222', 'title'=>'item title 222', 'public'=>0];
        $this->f3->set('item', $dummy);

        $this->setPageTitle("Edit Portfolio");
        echo $this->template->render("portfolio/form.html");
    }

    /**
     * validate and update an existing item
     */
    public function editSave(){
        if ($this->isFormValid()){
            // save and reroute
            echo "Saving existing data... maybe";
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
            echo "Saving new data... maybe";
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