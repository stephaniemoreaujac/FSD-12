<?php 
/**
 * Model to interact with Portfolio table
 */
class Portfolio extends Model{

    /**
     * Establish the table to use for the database
     */
    public function __construct(){
        parent::__construct('portfolio');
    }

    /**
     * Fetch only the public portfolio items
     * @return Object database results
     */
    public function fetchPublic(){
        $this->load('public=1');
        return $this->query;
    }

    /**
     * Update existing $id row from our table using POST data
     * @param int ID of the row to edit
     */
    public function updateById( $id ){
        $this->load( ['id=?', $id ]); // populate the object from the database
        $this->copyfrom('POST'); // overwrite object with form data
        
        // if the post public check is not checked
        // TODO: Find better solution $_POST
        if (!array_key_exists('public', $_POST)){
            $this->public = 0;
        }
    
        $this->update(); // UPDATE $table SET ... WEHRE id=$id
    }
    /**
     * Dummy method to show how we can manipulate all individual fields
     */
    public function addDummy(){
        $this->title="Awesome Portfolio Item " . time();
        $this->content = "This is the content of my awesome portfolio item";
        $this->public = 1;
        // $this->id = 1;
        $this->save();
    }
}