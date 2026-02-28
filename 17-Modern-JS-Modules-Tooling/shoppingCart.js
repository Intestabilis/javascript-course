// IMPORTING AND EXPORTING MODULES

/*

// Exporting module
// console.log('Exporting module');

// scoped to this module (are private in modules)
const shippingCost = 10;
// import/export is a live connection, so if we change it in import it will change there too
export const cart = [];

// We have 2 types of exports in JS: named exports and default exports

// Named export
// exports ALWAYS need to happen in top level code (won't work in if statement, for instance)
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
};

// export multiple thing with named exports
const totalPrice = 237;
const totalQuantity = 23;

// exporting multiple variables using named export
export {
  totalPrice,
  // we can change names of exported variables using as in export as well
  totalQuantity as tq,
};

// Default exports
// usually used when we want to export one thing from module

// we need no export a value itself, not variable
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
}

*/

// TOP-LEVEL AWAIT

/*

// Blocking code
console.log('Start fetching users');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finish fetching users');
// Code from importing module will be executed only after this blocking async code (so the first console messages will be these)
// So blocking code blocks not only this module, but also module that imports it

*/
