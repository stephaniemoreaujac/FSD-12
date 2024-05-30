/*
day1 - predict a user's fortune with hardcoded values
day2 - convert to function and conditional number of kids
day4 - add forced prompts and validate kids count 
*/
/*
// 1
let numKids = 4;
let partner = "Bob";
let job = "Actor";
let geoLocation = "Montreal";
let dog = "Trooper";
*/
function fortune(partner, job, geoLocation, dog, numKids=0){
// 2
    let output = "You will be a ";
    output += job;
    output += " who will one day marry ";
    output += partner;
    output += " and live in ";
    output += geoLocation;
    output += " with your ";
    
    if (numKids > 0){
        // OPTION 1
        // if (numKids == 1) output += "1 kid and your ";
        // else output += numKids + " kids and your "; 
        
        // OPTION 2
        output += numKids;
        // if (numKids == 1) output += " kid";
        // else output+= " kids";
        output += (numKids==1)?" kid":" kids";
        output += " and your ";
        
        // OPTION 3
        // output += numKids + " kid" + ((numKids==1)?"":"s") + " and your ";
    }

    output += "dog ";
    output += dog;

    console.log(output);
}

function promptFortune(){

    let partner = validator("What is your partner's name?");
    let job = validator("What do you do?");
    let geo = validator("Where are you from?");
    let pet = validator("What is your pets name?");
    let kids = validator("How many kids?");
    if (parseInt(kids) == kids )
        kids = Math.abs(kids);
    else kids = 0;

    fortune(partner, job, geo, pet, kids);
}

function validator(question){
    let answer;
    
    do {
        answer = prompt( question );
        if (checkValidation(answer))
            alert("You have to provide an answer!");
        // prompt user
    }while (checkValidation(answer));
/*
    do {
        if (answer !== undefined)
            alert("You have to provide an answer!");

        answer = prompt( question );
    }while (answer == null || answer.trim() == "");
    */
    return answer;
}

function checkValidation(str){
    return str == null || str.trim() == ""
}