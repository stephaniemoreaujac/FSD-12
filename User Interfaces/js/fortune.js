/*
day1 - predict a user's fortune with hardcoded values
day2 - convert to function and conditional number of kids
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