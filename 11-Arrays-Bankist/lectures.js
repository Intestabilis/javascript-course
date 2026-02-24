'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

////// BASIC ARRAY METHODS /////////////

/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// We can chain arrays methods just like with string

// SLICE (similar to strings slice)
// We can extract part of any array without changing the original array

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
// Just like with strings, end parameter is NOT included
// Length = end parameter - begin parameter

// Same as with strings - negative parameter starts at the end
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// Creates a shallow copy (like a spread operator array)
let shallowCopy = arr.slice();
console.log(shallowCopy);

// SPLICE - works as slice, but actually mutates original array
// console.log(arr.splice(2));
// console.log(arr);
// original array loses elements that splice returns

// deletes last element
arr.splice(-1);
console.log(arr);

// the second parameter is deleteCount - number of deleted elements from array (how much elements we want to splice)
arr.splice(1, 2);
console.log(arr);

// REVERSE

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
// reverse also mutates an original array
console.log(arr2);

// CONCAT

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// we can also use the spread operator, concat also doesn't mutate original array

// JOIN
// returns a string with array elements and given character between them
console.log(letters.join('-'));

// push, shift, pop, unshift, indexOf, includes - was in intro, also remember them quite nicely
*/

////// New "at" method /////////////

/*

const arr = [23, 11, 64];

console.log(arr.at(0));
// same as
console.log(arr[0]);

// default getting last array element
console.log(arr[arr.length - 1]);
// this slice without [] returns an array with one element
console.log(arr.slice(-1)[0]);
// at() method also works with backwards indexing and returns single value
console.log(arr.at(-1));

// at method also works on string
console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/

////// FOR EACH METHOD /////////////

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('--------------FOR EACH--------------------');

// forEach looping over the array and execute callback function at each iteration
// Also it will pass an element as an argument (movement in this case)
// For each passes current element, index and entire array as arguments (we can use as much of this parameters as we want)
// first - current element, second - current index, third - entire array
// movements.forEach(function (movement) {
movements.forEach(function (movement, index, arr) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ...

// One fundamental difference - continue and break don't work in forEach

// Most of array methods work with the same callback function principle as for each
*/

////// FOR EACH WITH MAPS AND SETS /////////////

/*

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Similar to arrays, but it's value, key and map instead of element, index and array
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

// In Sets key is exactly the same as the value (same signature for consistency)
// currenciesUnique.forEach(function (value, key, set) {
currenciesUnique.forEach(function (value, _, set) {
  // console.log(`${key}: ${value}`);
  console.log(`${value}: ${value}`);
});

*/

////// MAP, FILTER, REDUCE METHODS /////////////

////// MAP METHOD /////////////
// Map method do some operation (of callback function) to every element of array, then returns a new array (old stays unmutated)

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

const movementsUsd = movements.map(function (mov) {
  return mov * euroToUsd;
  // smth like that also works, will put 23 at every position (of mapped array) in the new array
  // return 23;
});

// same simplified with an arrow function
const movementsUsdArr = movements.map(mov => mov * euroToUsd);
console.log(movements);
console.log(movementsUsd);
console.log(movementsUsdArr);

// same with for of loop
const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * euroToUsd);
}

console.log(movementsUsdFor);

// Map method also have access to index and whole array

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`,
);

// if (mov > 0) {
//   return `Movement ${i + 1}: You deposited ${mov}`;
// } else {
//   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
// }

console.log(movementsDescriptions);

// it is array method function that calls callback function, so it allows it to pass element, index and array as arguments

*/

////// FILTER METHOD /////////////
// Works with the same callback function principle, returns new array with filtered elements (callback function returns filtered element)

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
const deposits = movements.filter(mov => mov > 0);
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    deposits.push(mov);
  }
}
console.log(depositsFor);

*/

////// REDUCE METHOD /////////////

// Boils down all elements of array to one single value
// First parameter in reduce method is accumulator, that accumulates value and passing through iterations

// We can specify the accumulator as second parameter of REDUCE method, so signature is: arr.reduce(function(acc, mov, i, arr){return newAcc}, 0);
// returned value of callback function is a new accumulator value

/*

// const balance = movements.reduce(function (acc, cur, i, arr) {});

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration number ${i}: ${acc}`);
//   return (acc += cur);
// }, 0);

const balance = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balance);

// same with for of loop
let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

// Maximum value

// const max = movements.reduce((acc, mov) => {
//   if (mov > acc) {
//     return mov;
//   } else {
//     return acc;
//   }
// }, movements[0]);

const max = movements.reduce(
  (acc, mov) => (mov > acc ? mov : acc),
  movements[0],
);

console.log(max);

*/

////// CHAINING METHODS /////////////

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// We can use an array for debugging in these pipelines (check current array in the next method)

// const totalDepositsUSD = movements
//   .filter(mov => mov < 0)
//   .map((mov, _, arr) => {
//     console.log(arr);
//     return mov * euroToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

*/

////// FIND METHOD /////////////
// Allows to find element based on condition
// Returns only first found element (that satisfies condition) (not an array!)

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// Account data stored in script.js file

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// same with for of loop

let accountFor;
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    accountFor = acc;
  }
}

console.log(accountFor);

*/

////// FIND INDEX METHOD /////////////

//works similar to find method, but returns index and not the element itself

////// FINDLAST, FINDLASTINDEX METHODS /////////////

// works similar to find and findIndex methods, but backwards

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

const lastWithdrawalIndex = movements.findLastIndex(mov => mov < 0);

const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000,
);

console.log(
  `Your latest large movement was ${movements.length - latestLargeMovementIndex} movements ago`,
);

*/

////// SOME AND EVERY METHODS /////////////

/* 

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// We can use includes to test if array includes a value (boolean)
// EQUALITY
console.log(movements.includes(-130));

// Some and every also check array, but using a condition instead of value

// Also return boolean value
// SOME: CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits);

// EVERY: CONDITION
// Works as the some method, but every return true only if every element satisfies the condition
console.log(movements.every(mov => mov > 0));

console.log(account4.movements);
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
// We can write a function separately and then just pass it as callback function

const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

*/

////// FLAT AND FLATMAP METHODS /////////////

/*

// FLAT
// Flat allows to create one array from all nested sub arrays and elements
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// Removes the nested arrays and flat the array

// [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arr.flat());

// default flat only goes one level deep, so doesn't flat the nested nested arrays like in that example

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

// [[1, 2], 3, 4, [5, 6], 7, 8]
console.log(arrDeep.flat());

// We can set depth argument for situations like this

// [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arrDeep.flat(2));

// FLATMAP

// We can get movements from all accounts using map, but then we will have nested arrays

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// Of course we can use chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance);

// Using the map and then flat is pretty common operation, so we have a flatMap method (that just combines them and is BETTER FOR PERFORMANCE)
// flatMap can go only 1 level deep

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

  */

////// SORTING ARRAY /////////////

// .sort() MUTATES ARRAY

/*

// Strings: sorts alphabetically A-Z
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

// Also sorts it alphabetically (from - to 1 to 2 to 3 to 4 to 7...)
//[-130, -400, -650, 1300, 200, 3000, 450, 70]
console.log(movements.sort());

// Sort's callback function accepts 2 values - current value and the next value

// We can imagine it as 2 consecutive numbers

// If we return a negative value, a will be sorted before b
// If we return a positive value, b will be sorted before a
// return < 0: A, B (keep order)
// return > 0: B, A (switch order)

// Ascending order
movements.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (b >= a) {
    return -1;
  }
});
console.log(movements);

// Descending order
movements.sort((a, b) => {
  if (a > b) {
    return -1;
  }
  if (b >= a) {
    return 1;
  }
});
console.log(movements);

// We can do this simpler

// Ascending
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
movements.sort((a, b) => b - a);
console.log(movements);

*/

////// ARRAY GROUPING /////////////
// Allows to group values in the array based on condition (well sql groupBy i guess)
// Well it's literally groupBy

/* 

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// first parameter is the array, second - callback function that determine how to group elements
const groupedMovements = Object.groupBy(movements, movement =>
  movement > 0 ? 'deposits' : 'withdrawals',
);

// Object.groupBy creates object, that has given strings for conditions as keys, and arrays with grouped elements as values
// callback function returns are group names (object keys) I suppose, when element of current iteration is placed in correspondent array

console.log(groupedMovements);

// Accounts will be sorted based on given conditions and activity (number of movements)
const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) {
    return 'very active';
  }
  if (movementCount >= 4) {
    return 'active';
  }
  if (movementCount >= 1) {
    return 'moderate';
  }
  return 'inactive';
});

console.log(groupedByActivity);

// We can use it with objects and group by one of the object properties

// We are grouping accounts based on their type property (basic, standard or premium)
// const groupedAccounts = Object.groupBy(accounts, account => account.type);

// We can simplify it further and destructure the object to their grouping property
const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedAccounts);

*/

////// MORE WAYS OF CREATING AND FILLING ARRAYS /////////////
// !IMPORTANT

/*

console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

////////////////////////////////
// Empty arrays + fill method

// Create array with 7 empty elements (so if we pass only one arguments, it creates new empty array with given length)
const x = new Array(7);
console.log(x);

// We can't call map or smth like that on this array

// Still empty
console.log(x.map(() => 5));

// Only method that we can call on empty array = fill()
// will fill all array with given value
// x.fill(1);

// [1, 1, 1, 1, 1, 1, 1]
console.log(x);

// We can specify where we want to fill the array with the second argument (begin parameter)
// x.fill(1, 3);

// [ , , , 1, 1, 1, 1]
console.log(x);

// And specify the end parameter (like in the slice() method) as the third argument (end index won't be included)
x.fill(1, 3, 5);

// [ , , , 1, 1,  ,  ,]
console.log(x);

// We can use this method not only on empty arrays

const arr = [1, 2, 3, 4, 5, 6, 7];

arr.fill(23, 2, 6);

// [1, 2, 23, 23, 23, 23, 7]
console.log(arr);

////////////////////////////////
// Array.from()

// first argument - object with length parameter (array-like or iterable)
// second argument - mapping function

// Will create array with seven 1 elements
const y = Array.from({ length: 7 }, () => 1);

// [1, 1, 1, 1, 1, 1, 1]
console.log(y);

// Callback function is exactly as map method callback function, so we have access to the current element and index
const z = Array.from({ length: 7 }, (_, i) => i + 1);

// [1, 2, 3, 4, 5, 6, 7]
console.log(z);

// Array with 100 random dice rolls
const randomRolls = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1),
);
console.log(randomRolls);

// Array.from() was initially introduced to create arrays from array-like structures (iterables)
// for instance, querySelectorAll returns a node list that is array-like object (but doesn't have a lot of array methods)
// Array.from() is perfect for this

// For test only
labelBalance.addEventListener('click', function () {
  // Without callback mapping function

  // // we converting node list to the array
  // const movementsUI = Array.from(
  //   document.querySelectorAll('.movements__value'),
  // );
  // // so we can use array methods
  // console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));

  // With callback mapping function
  // We can immediately use map function to do transformations that we want on array elements
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', '')),
  );
  console.log(movementsUI);

  // We can also spread the result of querySelectorAll to create an array, but then we'll need to use mapping function separately
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});

*/

////// NON-DESTRUCTIVE ALTERNATIVES /////////////
////// toReversed, toSorted, toSpliced, with /////////////
// Modern alternatives to reverse(), sort(), splice() that returns the array and don't mutate the original one

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);

// Mutates the original array
// const reversedMovements = movements.reverse();

// We can use slice() method to shallowCopy it and do reverse on the copy
// const reversedMovements = movements.slice().reverse();

// More modern toReverse() doesn't mutate original
const reversedMovements = movements.toReversed();
console.log(reversedMovements);
console.log(movements);

// Same principle with sorting and splicing:
// toSorted() - sort(),
// toSpliced() - splice()

// We can also change a value in the array not mutating the original

// mutating the array

// movements[1] = 2000;
// console.log(movements);

// if we don't want to mutate it, we can use with()

// first argument - index of the element that we want to change
// second argument - new value of the element
const newMovements = movements.with(1, 2000);
console.log(newMovements);

*/

////// ARRAY METHODS PRACTICE /////////////

/*

// 1.
console.log(accounts);
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, dep) => sum + dep, 0);

console.log(bankDepositSum);

// 2.

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

console.log(numDeposits1000);

// Alternative with reduce

// Postfix increment (count++) on count won't work, because it will return previous value
// but Prefix increment will work
const numDeposits1000_2 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, mov) => (mov >= 1000 ? count + 1 : count), 0);
  .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0);

console.log(numDeposits1000_2);

// 3.

// We can even use an object as accumulator value

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, mov) => {
      // if (mov > 0) {
      //   sums.deposits++;
      //   return sums;
      // } else {
      //   sums.withdrawals++;
      //   return sums;
      // }
      // mov > 0 ? (sums.deposits += mov) : (sums.withdrawals += mov);

      // cursed way to write this imo
      sums[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
      return sums;
    },
    {
      deposits: 0,
      withdrawals: 0,
    },
  );
console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1),
    )
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

*/
