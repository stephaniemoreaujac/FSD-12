// Note that is one possible solution for the practice problem

/**
 * Converts a string into an acronym
 * @param {string} slogan string to be converted
 */
function tooManyWords( slogan ){
  //When the function is called and the parameter passed is empty or not a valid string, output the following to the console "Cannot complete request".
  if ( typeof(slogan)!= "string" || slogan == "" ){
    printOut("Cannot complete request");
  }else{
    //Convert string to its acronym (acronyms are abbreviations formed from the initial letters of words)
    let accronym = "";
    let words = slogan.split(" ");
    
    for (let c = 0; c < words.length; c++ ){
      //The generated acronym should be in uppercase
      accronym += words[c].charAt(0).toUpperCase();
    }
    
    //Output to the console the acronym using the following format "X stands for Y"	- X being the newly created acronym	Y being the phrase they submitted
    printOut( accronym + " stands for " + slogan );
  }
}

/**
 * Output to the console the provided argument
 * @param {*} x Item to oupput to the console
 */
function printOut( x ){
	console.log( x );
}
