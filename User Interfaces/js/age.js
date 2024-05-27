/*
    We want to be able to calculate the possible age of a user.
*/

// 1
let yearCurrent = 2024;

// 2
let yearBirth = 1900;

// 3
let age1, age2;
age1 = yearCurrent - yearBirth;
// age2 = yearCurrent - yearBirth - 1;
age2 = age1 - 1; // remove redudant code

// 4
console.log("You're either " + age1 + " or " + age2 + " years old.");