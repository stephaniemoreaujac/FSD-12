console.log("objects");

// create an object
let teacher = {
    firstName : "Steph",
    lastName : "Moreau",
    birthday : {"month" : 5, "day" : 29 },
    likes : ['ninja', 'cats'],
    weigth : 55,
    rollcall : function (){
        console.log("Is everyone present?");
    }
}

/*

teacher.firstName = "Stephanie;
VM1835:1 Uncaught SyntaxError: Invalid or unexpected token
teacher.firstName = "Stephanie";
'Stephanie'
 teacher
{firstName: 'Stephanie', lastName: 'Moreau', birthday: {…}, likes: Array(2), weigth: 55}birthday: {month: 5, day: 29}firstName: "Stephanie"lastName: "Moreau"likes: (2) ['ninja', 'cats']weigth: 55[[Prototype]]: Object
teacher.age = 22;
22
teacher
{firstName: 'Stephanie', lastName: 'Moreau', birthday: {…}, likes: Array(2), weigth: 55, …}age: 22birthday: {month: 5, day: 29}firstName: "Stephanie"lastName: "Moreau"likes: (2) ['ninja', 'cats']weigth: 55[[Prototype]]: Object
teacher.age = 25
25
teacher
{firstName: 'Stephanie', lastName: 'Moreau', birthday: {…}, likes: Array(2), weigth: 55, …}age: 25birthday: {month: 5, day: 29}firstName: "Stephanie"lastName: "Moreau"likes: (2) ['ninja', 'cats']weigth: 55[[Prototype]]: Object
delete teacher.weight
true
teacher
{firstName: 'Stephanie', lastName: 'Moreau', birthday: {…}, likes: Array(2), weigth: 55, …}age: 25birthday: {month: 5, day: 29}firstName: "Stephanie"lastName: "Moreau"likes: (2) ['ninja', 'cats']weigth: 55[[Prototype]]: Object
teacher.weigth
55
delete teacher.weigth
true
teacher
{firstName: 'Stephanie', lastName: 'Moreau', birthday: {…}, likes: Array(2), age: 25}age: 25birthday: {month: 5, day: 29}firstName: "Stephanie"lastName: "Moreau"likes: (2) ['ninja', 'cats'][[Prototype]]: Object*
*/

// REUSABLE OBJECTS
/**
 * Constructor for Planet object
 * @param {string} pName 
 * @param {number} pDiameter 
 */
function Planet (pName, pDiameter){
    this.name = pName;
    this.diameter = pDiameter;
    this.details = function (){
        return "The Planet " + 
            this.name + 
            " has a diameter of " + 
            this.diameter + "km";
    }
    this.increaseDiameter = function(){
        this.diameter += 100;
        return this.diameter;
    }
}

planetMercury = new Planet("Mercury", 123);
planetEarth = new Planet("Earth", 456);

for (let p in planetEarth){
    console.log(p);
    console.log(planetEarth[p]);
}

/**
 * Constructor for Sport object
 * @param {string} argName 
 * @param {number} argPlayerCount 
 * @param {Array} [argSeason] 
 */
function Sport(argName, argPlayerCount, argSeason=[]){
    this.name = argName;
    this.players = argPlayerCount;
    this.season = argSeason;
    this.playableSeasons = this.season.length;
    this.addSeason = function(argNewSeason){
        this.season.push(argNewSeason);
        this.playableSeasons++;
    }


}
