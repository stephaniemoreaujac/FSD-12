<?php 
// user-defined functions

/**
 * Validate is the value if empty
 * TODO: if no array provided, check only $key value
 * @param String $key 
 * @param Array $array
 * @return bool
 */
function validateIsEmptyText($key, $array){

    if (!array_key_exists($key, $array) || trim($array[$key]) == "" ){
        return true;
    } else { 
        return false;
    }

}