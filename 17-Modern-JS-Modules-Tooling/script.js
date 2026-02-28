//////////////////////////////////////////////
// IMPORTING AND EXPORTING MODULES
//////////////////////////////////////////////
// Importing modules

// Importing module

// all modules are executed in strict by default
// importing module, also work without .js
// import './shoppingCart.js';
// console.log('Importing module');

// Imports are executed first, in console we have:
// Exporting module
// Importing module

/*

// to import smth
import {
  addToCart,
  // we can change names of imports like this
  totalPrice as price,
  tq,
} from './shoppingCart.js';

// we can't do this without exports because it's scoped to the module (shoppingCart.js)
// console.log(shippingCost);

// will work, because we imported it
addToCart('bread', 5);
console.log(price, qt);

*/

// We can import all the exports of the module at the same time like this
// and also set module name with as

/*

import * as ShoppingCart from './shoppingCart.js';

// it's similar to class syntax, but actually a module
// we can say that exports are public API's of modules
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);

*/

/*

// Default exports
// When we import it, we can give it any name we want
// Also we don't have to use {} in default exports
import add from './shoppingCart.js';
import { cart } from './shoppingCart.js';

add('bread', 15);
add('pizza', 3);
add('apples', 5);

// we see an array with added objects, even with cart being in imported module
// so it is a live connection and not a copy
console.log(cart);

// We can do multiple exports, but it's not advisable

// Also we can have default and named imports/exports at the same time
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// In practise we usually don't do this and we shouldn't do this, that's confusing at least

*/

//////////////////////////////////////////////
// TOP-LEVEL AWAIT (ES2022)
//////////////////////////////////////////////

// Top-level await only works in modules

/*

// It works, because script.js has type="module"
// But this actually blocks the execution of the entire module
console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('Something');

// In console:
// Start Fetching
// posts object
// Something

*/

/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// Actually a Promise if we use it without await
// const lastPost = getLastPost();

// We can use this workaround (not very clean)
const lastPost = getLastPost();
lastPost.then(last => console.log(last));

// will actually be a result of awaiting this Promise
const lastPost2 = await getLastPost();
console.log(lastPost2);

*/

// If one module imports a module with top-level await, the importing module will wait for imported module to finish the blocking code

//////////////////////////////////////////////
// THE MODULE PATTERN
//////////////////////////////////////////////

/*

// That pattern was used before ES6 to simulate modules
// Main problem was that for each module we have to create different script and link all them in HTML (so there were problems with global scope of variables, order, module bundling etc)

// Main goal of the module pattern is to encapsulate functionality to have private data and to expose API
// The best way to achieve it - simply use function(s)

// usually we write IIFE so we don't need to call it separately and it will be only called (created) once
// goal of function not to reuse code but to create a new scope and return data just once

// to export and assign this, we simply creates a new variable and assign it VALUE of function CALL
// so we are assigning returned object to the variable

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} was added to the cart (shipping cost is ${shippingCost})`,
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  // to create a public API, we return an object that contains public functionality

  // we also can define all that right in this object as properties/methods
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);

console.log(ShoppingCart2);
// we can't do this, private properties are not accesible
// console.log(ShoppingCart2.shippingCost);

// all it works thanks to the function closures

*/

//////////////////////////////////////////////
// COMMONJS MODULES
//////////////////////////////////////////////

// AMD modules and CommonJs modules - not native module systems used by JS in the past
// CommonJs have been used in NodeJs almost all of it's existence
// Almost all the modules in npm still use CommonJs system because of it (npm was only intended for Node first)
// Just like with ES6, in CommonJs 1 file = 1 module

/*

// that would work in NodeJs and how it would look in CommonJs (Node.js)
// Export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} was added to the cart (shipping cost is ${shippingCost})`,
    );
  };

// Import
// We need to use require function
const { add } = require('./shoppingCart.js');

*/

//////////////////////////////////////////////
// INTRODUCTION TO NPM, BUILDING WITH PARCEL AND NPM SCRIPTS, CONFIGURING BABEL AND POLYFILLING
//////////////////////////////////////////////

// NPM INTRODUCTION

// Before npm we used to link libraries directly to html
// Generally that was a mess with html loading libraries, updating versions manually, searching, downloading and managing libraries on PC

// 1. we need to initialize npm with npm init
// 2. then it'll create package.json

// to install libraries, we need to use npm install package-name (or npm i package-name)
// it will create a dependencies field in package.json and download library in node_modules folder
// to specify version with npm installing we add "@version" (like @1.12) after package-name

// if library use CommonJs module system, we can't simply import it now and have to use module bundler

// Using lodash (lodash-es for ES module importing)

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

// in bundlers we can do this instead of full importing like above
// it works with any assets/modules/etc (and other modules like CommonJs too ig)
import cloneDeep from 'lodash-es';

// Cloning nested object with cloneDeep lodash function

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

console.log(stateClone);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

// When we copy our project/uploading it somewhere/etc we should never include node_modules because that folder will probably be huge
// Instead package.json containing all information about installed libraries
// So having package.json we simply run npm install to install all libraries from dependencies

// PARCEL

// We have bundlers like webpack and parcel
// webpack harder to configure, while parcel is ready to use from box
// parcel is also an npm tool, but we have to use --save-dev after package name (npm i parcel --save-dev)
// -dev is a dependency that we need to build application, but don't have to include in our code

// Parcel also CLI

// to use locally installed parcel, we can use npx or npm script
// to use parcel we use npx parcel entry-point-filename, line npx parcel index.hmtl
// entry point is file with reference (link) to main script/smth like that

// Besides bundling (and creating a new folder dist after that), Parcel also creates a live server

// After reloads parcel will reload generated script (and page) too

// In parcel we can activate hot module replacement (code for parcel only) (not sure about current version)
if (module.hot) {
  module.hot.accept();
}

// it wll trigger a rebuild when we change on of the modules, but new modified bundle will be automatically injected into a browser without triggering page reload

// in practice we use npm script instead of npx (and it allows us to automate terminal scripts)
// we can specify script in package.json and then run it with npm run

// to build a final version with parcel we use parcel build
// build command compress everything into code with more performance

// for installing package globally we use -g after install command (npm install parcel -g)

// BABEL

// Configuring Babel and Polyfilling
// we do it to transpile code back to ES5 for compability
// Parcel automatically uses Babel to transpile code
// We can configure Babel manually, but Parcel defaults usually good enough
// Babel works with plugins and presets that both can be configured

// Plugin - specific JS feature that we want to transpile (like arrow function)
// Presets - bunch of plugins bundle together
// By default Babel uses preset-env (based on browser support, only browsers with less that 0.25% support won't be transpilled)

// preset-env includes only final features, not experimental (even stage 3)

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');
console.log('js' ?? null);
console.log(state.cart.find(el => el.quantity > 2));
Promise.resolve('TEST').then(x => console.log(x));

// Babel actually can transpile only ES6 syntax to ES5, but not new features like find or Promise
// We can polyfill features like that and should do this

// library for polyfilling
import 'core-js/stable';
// we can cherypick what to polyfill like this (to reduce bundle size)
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// polyfilling simply recreate new features and makes them available in bundle, so code can use it

// library for polyfilling async functions
import 'regenerator-runtime/runtime';
