// CONVERT.js

let celsius, fahrenheit, lbs, kg;

/* Convert celsius into fahrenheit */
celsius = -40;
fahrenheit = ( (celsius * 9) / 5 ) + 32;
console.log( celsius + "C is " + fahrenheit + "F");


/* Convert fahrenheit into celsius */
fahrenheit = 32;
celsius = ( ( fahrenheit - 32 ) * 5) / 9
console.log( fahrenheit + "F is " + celsius + "C");


/* Convert pounds into kilograms */
lbs = 200;
kg = lbs / 2.2046;
console.log(lbs + "lbs is " + kg + "kg");


/* Convert kilograms into pounds */
kg = 50;
lbs = kg / 0.454;
console.log(kg + "kg is " + lbs + "lbs");
