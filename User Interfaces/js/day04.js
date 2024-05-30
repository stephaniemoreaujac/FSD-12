console.log("Day 04");

/**
 * Sample alert function
 */
function sampleAlert(){

    console.log("Hello");
    alert("Hi");
    console.log("Hello");
    

}

/**
 * Sample confirm function
 */
function sampleConfirm(){
    console.log("before");
    let answer = confirm("Are you sure?");
    console.log("After");

    if (answer){
        console.log("Yes I am!");
    } else {
        console.log("Nevermind");
    }

}

/**
 * Sample prompt function
 */
function samplePrompt(){
    console.log("before");
    let answer = prompt("Your name?");
    console.log("after");

    if (answer == null){
        alert("We cannot be friends!");
    } else {
        alert("Nice to meet you " + answer);
    }
}

function writeConsole(){
    console.log("Here!");
}
function writeConsoleArguments(str){
    console.log("I said: " + str);
}

let timerId = setTimeout(writeConsole, 3000);
setTimeout(function(){ console.log("I am here"); }, 4000);
setTimeout(writeConsoleArguments, 2500, "Chicken");

let intervalId = setInterval(writeConsole, 10000);






/**
 * Find Fibonacci number at given index
 */
function fibonacci(num) {
    if (num <= 1) return 1;
  
    return fibRecur(num - 1) + fibRecur(num - 2);
}

