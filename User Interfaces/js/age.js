/*
    Day01 - We want to be able to calculate the possible age of a user.

    Day02 - convert into functions and validate year birth is a number

    Day03 - remove hardcoded year
*/

/**
 * Guess a users  age based on the year they were born
 * @param {number} yearBirth Year of birth 
 * @returns {string} the guess of users age
 */
function guessAge(yearBirth) {
    // 1
    let d = new Date();
    // d.setFullYear(2000);
    let yearCurrent = d.getFullYear();

    // 2
    // let yearBirth = 1900;
    if (yearBirth > 0 && // also saves the empty string and space 
        (   
            typeof yearBirth == "number" ||
            (typeof yearBirth == "string" && !isNaN(yearBirth))
         )
        ){
        // 3
        let age1, age2;
        age1 = yearCurrent - yearBirth;
        // age2 = yearCurrent - yearBirth - 1;
        age2 = age1 - 1; // remove redudant code

        // 4
        return ("You're either " + age1 + " or " + age2 + " years old.");
    }
}

/**
 * Ask user for year of birth and validate the value
 */
function promptYear(){
/*
    let userYear = prompt("What year were you born?");
    let d = new Date();
    if (userYear != null){
        // is the provided year in the past
        if (userYear <= d.getFullYear){
            // alert with guessAge
            guessAge(userYear);
        }else{
            // alert user
            userYear = prompt("What year were you born?");
            // redudant function call
        }
    } // else do nothing else
*/
    let userYear;
    let yearIsValid = false;
    let d = new Date();
    do{
        userYear = prompt("What year were you born?");
        if (userYear == null){ // request cancelled
            yearIsValid = true;
        }else{
            if ( parseInt(userYear) <= d.getFullYear() )
                yearIsValid = true;
            else
                alert("That year is not valid")
        }
    } while(!yearIsValid);

    if (userYear != null)
        alert( guessAge( parseInt(userYear) ) );
}