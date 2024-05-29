/*
    Day01 - We want to be able to calculate the possible age of a user.

    Day02 - convert into functions and validate year birth is a number

    Day03 - remove hardcoded year
*/

/**
 * Guess a users  age based on the year they were born
 * @param {number} yearBirth Year of birth 
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
        console.log("You're either " + age1 + " or " + age2 + " years old.");
    }
}