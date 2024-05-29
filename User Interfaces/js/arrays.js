console.log("arrays.js");

/**
 * Function accepts a string as an input and remove all vowels from the string 
 * @param {string} strOriginal 
 * @returns {string} original string without vowels
 */
function removeVowels(strOriginal){
    let strNew = "";
    let arrVowels = ['A','E','I','O','U','a','e','i','o','u'];

    // loop throught every letter and check if it's a vowel
    for (let i =0; i< strOriginal.length; i++){
        if ( arrVowels.indexOf( strOriginal[i] ) == -1 )
            strNew += strOriginal[i];
    }
     return strNew;
}

console.log( removeVowels("Hello World") );
console.log( removeVowels("HELLO EVERYONE") );

/**
 * Function accepts a string as an input and remove all vowels from the string.
 * Using only lower case
 * @param {string} strOriginal 
 * @returns {string} original string without vowels
 */
function removeVowelsOpt2(strOriginal){
    let strNew = "";
    let arrVowels = ['a','e','i','o','u'];

    // loop throught every letter and check if it's a vowel
    for (let i =0; i< strOriginal.length; i++){
        if ( arrVowels.indexOf( strOriginal[i].toLowerCase() ) == -1 )
            strNew += strOriginal[i];
    }
     return strNew;
}
console.log( removeVowelsOpt2("Hello World") );
console.log( removeVowelsOpt2("HELLO EVERYONE") );

/**
 * Function that swaps the case of each character of given string and outputs the results
 * @param {string} strOriginal 
 */
function swapCase(strOriginal){
    let arrUpper = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    //let arrLower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let arrLower = 'abcedfghijklmnopqrstuvwxyz';
    let strNew = "";

    for (let i =0; i<strOriginal.length;i++){
        let curChar = strOriginal[i]; // save time
        
        if (arrUpper.indexOf(curChar) != -1){ // this is uppercase letter
            // let curIndex = arrUpper.indexOf(curChar);
            // strNew += arrLower[curIndex];
            strNew += curChar.toLowerCase();
        } else if (arrLower.indexOf(curChar) != -1 ){ // this is a lowercase letter
            // let curIndex = arrLower.indexOf(curChar);
            // strNew += arrUpper[curIndex];
            strNew += curChar.toUpperCase();
        } else 
            strNew += curChar;
 
    }
    console.log(strNew);
}

swapCase("Hello World");
swapCase("HELLO EVERYONE");