console.log("objects");

let cartItems = {
    apple: "1.25",
    chips: "0.99",
    banana: "25.01",
    shirt: "0.60",
    towel: "10.34",
    shovel: "22.36"
}
/**
 * Write a function named cashRegister that takes a shopping cart object and return the total price of the shopping cart.
 * @param {object} shoppingCart Contain item names and prices – itemName: itemPrice. 
 * @returns {number} total price of the shopping cart
 */
function cashRegister(shoppingCart){
    let total = 0;

    for (let i in shoppingCart){
        total += Number.parseFloat(shoppingCart[i]);
    }

    return total;
}

