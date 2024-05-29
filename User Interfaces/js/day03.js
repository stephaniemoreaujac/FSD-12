console.log("day 3");

// array is not a real data type
let x = [];
console.log(typeof x); // object

let dogs = ["pug", "beagle", "pug", "golden", "pug"];
let multi = [
    ["apple", "apricot"],
    ["banana", "berries"],
    ["cherries", "cranberries", "chips"],
    ["dragonfruit"]
]

console.log(multi[2][1]); // cranberry

dogs.length;

dogs.indexOf("Pug");    //  -1
dogs.indexOf("pug");    //  0
dogs.indexOf("pug",1);  //  2


// add to start
console.log(dogs);
let newLength = dogs.unshift("labrador"); // add to start of array
console.log(dogs);
console.log("dogs now has " + newLength + " elements");

dogs.unshift("pug", "Boxer");
console.log(dogs);

// remove from start
dogs.shift(); 
console.log(dogs);
let removedItem = dogs.shift();
console.log("remove item was " + removedItem);
console.log(dogs);

// add to the end
dogs.push("collie");
console.log(dogs);

newLength = dogs.push("pug", "poodle");
console.log(dogs);
console.log("dogs now has lenght of " + newLength);

// remove from end
dogs.pop();
console.log(dogs);
removedItem = dogs.pop();
console.log(dogs);
console.log("Removed item was : " + removedItem);

// change values
dogs[3] = "boxer";
console.log(dogs);


// DO NOT DO THIS...
/*
dogs[dogs.length] = "corgi";
console.log(dogs);

dogs[12] = "retriever";
console.log(dogs);
console.log(dogs.length);
*/
// START DOING STUFF AGAIN...


// splice
let returnFood;
let food = ['apple', 'banana', 'carrot','mango'];
console.log(food);
// add using splice
returnFood = food.splice(3,0,"watermelon", "kiwi");
console.log(food);
console.log(returnFood);

// remove using splice
returnFood = food.splice(1, 2);
console.log(food);
console.log(returnFood);

// add and remove
returnFood = food.splice(2,1,"honeydew");
console.log(food);
console.log(returnFood);

// CONCAT

let arrBoys = ["Pete","John","Henri"];
let arrGirls = ["Julie","Pam","Laura"];

console.log(arrBoys);
console.log(arrGirls);

let arrName = arrBoys.concat(arrGirls);

console.log(arrName);

arrName = arrGirls.concat("Phil", arrBoys);
console.log(arrName);

// JOIN
let strNames = arrGirls.join("-");
console.log(strNames);

let tmpName = "";
for (let x of arrGirls){
    if (tmpName != "") tmpName += "-";
    tmpName += x;
}
console.log(tmpName);

//SPLIT
let arrNew = tmpName.split("-");
console.log(arrNew);
arrNew = tmpName.split("a");
console.log(arrNew);

// SORT
// sorts by "alphabetical" value not numerical
let arrNumbers = [1,12,100,31];
console.log(arrNumbers.sort())

// create own sorting algorithem for numerical values
console.log( arrNumbers.sort( function(a,b){ return a-b} ) );

