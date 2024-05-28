console.log("Day 2");

let curYear = 2024;
let num = 0;
let firstName = "Steph";
/*
// CONDITIONAL STATEMENT
if (curYear == 2024){
    console.log("This is the current year");
} else if (curYear > 2020) {
    console.log("not the current year");
}
*/
/*
// WHILE LOOP
let str = "";
while (num < 10){
    num++;
    if (str != "")
        str += ", ";
    str += ++num;
}
console.log("Final value of num is " + num);
console.log(str);
*/
/*
// DO WHILE
let str = "154";
do {
    str += num++;
    console.log(num);
} while(str.length < 10 && num < 5);
console.log("Final string: " + str);
*/
/*
// FOR LOOP
for (let i = 2020; i <= curYear; i++){
    console.log(curYear);
}

// FOR IN LOOP
console.log("For Loop");
let colors = ["blue", "red", "orange", "green"];
for (let j = 0; j < colors.length; j++){
    console.log(colors[j]);
}

console.log("For...In Loop");
for (let c in colors){
    console.log(colors[c]);
}

console.log("For...Of Loop");
for (let x of colors){
    console.log(x);
}
*/

/**
 * Basic function without parameter or return values
 * that outputs the users name!
 */
function myNameIs(){
    console.log("Hello");
    console.log("My name is " + firstName);
}

/**
 * example of a basic function
 */
function whatIsYourName(){
    firstName = "John";
    myNameIs();
}

/**
 * Say hello to given users name
 * @param {string} yourName User name to greet.
 */
function sayHello(yourName){
    console.log("Hello " + yourName + "! Nice to meet you.");
}

/**
 * Say hello and that they live far away
 * @param {string} who Users name to greet
 * @param {string} where Users location
 */
function whoAndWhereAreYou(who, where){
    sayHello(who);
    console.log(where + " is far way!");

}

/**
 * Talk about when and where a user works
 * @param {string} [when=`weekends`] The time they work 
 * @param {string} [where=undefined] The location they work
 */
function whenAndWhereDoYouWork(when="weekends", where=undefined){
    console.log("You work on " + when);
    if (where != undefined)
        console.log(where + " is a great place to work");

}

/**
 * Example of a multi return function
 * @returns {string} random string text
 */
function details(){
    let str = "Your name is : " + firstName;
    if (firstName == "Steph"){
        firstName = "Bob";
        return firstName;
    }
    return str;
    console.log("Not going to show up");
}

/**
 * Provide information about teacher teaching students
 * @param {string} teacherName Name of the teacher
 * @param {number} [studentCount=0] Number of students
 * @returns {string} Description of class status
 */
function everything(teacherName, studentCount=0){
    let str = "";
    str = "The teacher " + teacherName + " is teaching ";
    if (studentCount == 0){
        str += "nobody";
    } else if (studentCount <15){
        str += "a big class";
    } else {
        str += "everybody";
    }

    return str;

}
