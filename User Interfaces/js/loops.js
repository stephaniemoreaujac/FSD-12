/*
1. print all numbers 1-100
2. divisible by 3 - print fizz
3. divisible by 5 - print buzz
*/

for (let i = 1; i <=100; i++){
    /*
    if ( (i%3)==0 && (i%5)==0){
        console.log("FizzBuzz");
    }else if ((i % 3) == 0){
        console.log("Fizz");
    } else if ( (i % 5) == 0){
        console.log("Buzz");
    } else {
        console.log(i);
    }
    */
    // divisible by 3 or 5
    let str = "";
    if ( (i%3)==0 || (i%5)==0 ){ 
        if ((i%3)==0) str += "Fizz"; 
        if ((i%5)==0) str += "Buzz";
    }else
        str = i;
    console.log(str);
}
