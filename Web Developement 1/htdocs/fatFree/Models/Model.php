<?php
/**
 * Parent model class
 */
class Model extends DB\SQL\Mapper {

    protected $db; // databse connection

    /**
     * Parent class constructor
     * @param string $table Name of the database table to interact with
     */
    public function __construct($table){
        // TODO: move sensitive data to configuration file
        $f3 = Base::instance(); // load the framework

        $db_name = $f3->get('DBNAME');
        $db_user = $f3->get('DBUSER');
        $db_pass = $f3->get("DBPASS");
        $db_port = $f3->get('DBPORT');
        // connect to the database
        $this->db = new DB\SQL(
            "mysql:host=localhost;dbname={$db_name};port={$db_port}",
            $db_user,
            $db_pass
        );

        // create mapper of given table
        parent::__construct($this->db, $table);
    }


    /**
     * Fetch all the rows in the table
     * @return Object database results
     */
    public function fetchAll(){
        $this->load(); // SELECT * FROM `model table`
        return $this->query;
    }

    /**
     * Fetch a single value from the table using the `id` primary key
     * @param int Id of row to fetch
     * @return Object database result
     */
    public function fetchById( $id ){
        return $this->findone(['id=?', $id]);
    }

    /**
     * Delete a row from the table using the `id` primary key
     * @param int ID of row to delete
     */
    public function deleteById( $id ){
        $this->load(['id=?', $id]);  // load the object
        $this->erase(); // DELETE FROM `$table` WHERE id=$id LIMIT 1
    }

    /**
     * Insert a new row into the table using POST data
     * @return int Last inserted ID
     */
    public function addItem(){
        $this->copyfrom('POST');
        $this->save();

        return $this->id; // last insersted id
    }

    /**
     * Update existing $id row from our table using POST data
     * @param int ID of the row to edit
     */
    public function updateById( $id ){
        $this->load( ['id=?', $id ]); // populate the object from the database
        $this->copyfrom('POST'); // overwrite object with form data
        $this->update(); // UPDATE $table SET ... WEHRE id=$id

    }

}