///////////// CONVERTING AND CHECKING NUMBERS /////////////
// isNaN(), isFinite(), isInteger()

/*

// All numbers in javascript internally are floating point numbers (so decimals), no matter how we write them

// true
console.log(23 === 23.0);

// Internally represented in 64 based 2 format (stored in binary format)
// In binary it's hard to represent fractures (I already know it but just to refresh)

// Base 10 = 0 to 9 1/10 = 0.1, 3/10 = 3.333333... (3.(3))
// Base 2 (binary) = 0 1

// 0.30000000000000004
console.log(0.1 + 0.2);

// false
console.log(0.1 + 0.2 === 0.3);

// converting string to a number

// Conversion
console.log(Number('23'));
// easy way with type coercion
console.log(+'23');

// Parsing
// 30 with number type
console.log(Number.parseInt('30px'));

// String NEEDS to start with a number, or else we will have NaN
console.log(Number.parseInt('e23'));

// parse also accept a second argument with a base of number system (2, 8, 10, 16 etc.)

// 10
console.log(Number.parseInt('30px', 10));
// 24
console.log(Number.parseInt('30px', 8));

// parse a decimal number
// 2.5
console.log(Number.parseFloat('2.5rem'));
// 2
console.log(Number.parseInt('2.5rem'));

// Padding also doesn't affect parsing

// parseInt() and parseFloat are global function so we can do this, but it's more encouraged to call them with Number object
console.log(parseInt('2.5rem'));

// NaN
// false
// Check if value is NaN (literally NaN)
console.log(Number.isNaN(20));
// false because it isn't NaN
console.log(Number.isNaN('20'));
// true because it is NaN after converting
console.log(Number.isNaN(+'20X'));

// also false, because it's give us Infinity
console.log(Number.isNaN(23 / 0));
// Infinity
console.log(23 / 0);

// So isNaN() not a perfect way to check for NaN

// isFinite, on the other hand...
// Checking if value is number

// true because it is finite
console.log(Number.isFinite(20));

// false because it's not a number (a string)
console.log(Number.isFinite('20'));

// false
console.log(Number.isFinite(+'20X'));

// false because Infinity
console.log(Number.isFinite(23 / 0));

// also we have

// true (both)
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));

// false
console.log(Number.isInteger(23 / 0));

*/

///////////// MATH AND ROUNDING /////////////

/*

// Square root
// 5
console.log(Math.sqrt(25));
console.log(5 ** (1 / 2));
// Cubic root
console.log(8 ** (1 / 3));

// returns a maximum value
console.log(Math.max(5, 17, 23, 11, 2));

// also does type coercion
console.log(Math.max(5, '17', 23, '11', 2));

// but not a parsing (will return NaN)
console.log(Math.max(5, '17px', 23, '11', 2));

// min the same but for a minimum value
console.log(Math.min(5, '17px', 23, '11', 2));

// Constants of Math object

// area of a circle with 10px radius
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Math.random() returns a value between 0 and 1
// console.log(Math.random());

// We can multiply it by needed number with truncate, then result will be in 0...(number-1) range
// console.log(Math.trunc(Math.random() * 6));

// So we can add 1 to offset this truncation
console.log(Math.trunc(Math.random() * 6) + 1);

// Random number generator

const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// random number between 10 and 20
console.log(randomInt(10, 20));

console.log(randomInt(0, 3));

// Rounding integers
// These method DO type coercion

// Math.trunc Removes any decimal part
console.log(Math.trunc(23.3));

// Math.round Rounding to the nearest integer
console.log(Math.round(23.3));
console.log(Math.round(23.9));

// Math.ceil Rounding up (always)
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

// Math.floor Rounding down (always)
console.log(Math.floor(23.3));
console.log(Math.floor(23.9));

// floor and trunc are similar when we're dealing with positive numbers
// but with negative floor will round closer to 0
console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.9));

// Rounding decimals
// toFixed rounding with given characters after dot
// toFixed ALWAYS return a string
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
// Converting back to a number
console.log(+(2.345).toFixed(2));

// for toFixed javascript do a boxing for (2.7) in this example, and then call a method on object, and then convert back to a primitive

*/

///////////// REMAINDER OPERATOR /////////////
// %, returns remainder of a division (остача)
// 5 % 2 = 1

/* 

// 1
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

// 2
console.log(8 % 3);
console.log(8 / 3); // 8 = 3 * 2 + 2

// We can check if number even or odd with % 2
// number % 2 === 0     even
// number % 2 === 1     odd

const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(
    function (row, index) {
      if (index % 2 === 0) {
        row.style.backgroundColor = 'orangered';
      }
      if (index % 3 === 0) {
        row.style.backgroundColor = 'blue';
      }
    },
  );
});

*/

///////////// NUMERIC SEPARATORS /////////////
// 1_000_000_000

// We can use underscore (_) as numeric separator
// It won't have any actual effect, but easier to read

/*

//287,460,000,000
const diameter = 287_460_000_000;
// 287460000000
console.log(diameter);

const price = 345_99;
// 34599
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_5_00;

// we can NOT place separator around the dot (3_.1415 or 3._1415) or at the beginning/end of the number (_3.1415 or 3.1415_)
// also we can NOT place two in a row (3.14__15)
const PI = 3.1415;
console.log(PI);

// it doesn't work with convertion/parsing, we should use it ONLY in the numbers
console.log(Number('23000'));
// NaN
console.log(Number('230_00'));
// 230
console.log(Number.parseInt('230_00'));

*/

///////////// BIGINT /////////////

/*

// regular numbers are 64 bits, regular numbers using 53 bits for number and 11 other for dot position and sign

// maximum number
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// not correct, add only 1 when should've added 2
console.log(2 ** 53 + 1);

// BigInt
// Can be used to store really large numbers

// n in the end transform regular number into a BigInt number
console.log(4732472347324723473275437574n);
console.log(typeof 4732472347324723473275437574n);

// Doesn't represent correctly because of already given big number as number, should be used with small enough numbers ig
console.log(BigInt(4732472347324723473275437574));

console.log(BigInt(4732472347324));

// Operations

// Operators work the same
console.log(10000n + 10000n);

const huge = 20312321452345n;
const num = 23;

// We can not mix regular numbers with BigInt and should convert a number
// console.log(huge * num);
console.log(huge * BigInt(num));

// Two exceptions:

// 1. Logical operators
console.log(20n > 15);
// False (different types)
console.log(20n === 20);
// True (type coercion)
console.log(20n == 20);
console.log(20n == '20');

// 2. String concatenations (numbers are converted to a string, even BigInts)

console.log(huge + ' is REALLY big!');

// Math methods won't work

// console.log(Math.sqrt(16n));

// Divisions

// 3n
console.log(10n / 3n); //will  return the closest bigInt (cut the decimal part off)
// 3n
console.log(11n / 3n);

*/

///////////// DATES /////////////

/*

// Create a date (4 ways)

// Creating a date with current datetime
const now = new Date();
console.log(now);

// Parsing a string (not very reliable)
console.log(new Date('Feb 23 2026 15:35'));
console.log(new Date('December 24, 2015'));

// It's okay when Javascript created a date
console.log(new Date(account1.movementsDates[0]));

// year, month, day, hour, minute, second
// month are zero-based (only month)
console.log(new Date(2037, 10, 19, 15, 23, 5));

// JS automatically corrects the day and increase the month (November 33 => December 3)
console.log(new Date(2037, 10, 33));

// We can pass number of milliseconds from Jan 1 1970
console.log(new Date(0));

// Jan 4
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 259200000 - a timestamp



// Working with dates

// DO NOT USE 'getYear()'it doesn't work correctly
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());

console.log(future.getMonth());
// get day as number in the month (1-31)
console.log(future.getDate());
// get day as number in the week (Thu - 4)
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

// formatting and returning ISO string with a date to store/etc
console.log(future.toISOString());

// get timestamp (in milliseconds)
console.log(future.getTime());

// same date
console.log(new Date(2142249780000));

// get a timestamp for current moment
console.log(Date.now());

// Setters almost the same
future.setFullYear(2040);
console.log(future);

*/

///////////// OPERATIONS WITH DATES /////////////

/*

// any time we convert date to a number we get a timestamp, so we can freely substract or add dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));

console.log(days1);

// For precise calculations (with daytime passing etc etc) should use library like moment.js

*/

///////////// Internationalizing Dates (INTL) /////////////

/*

// Experimenting with the API
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

const locale = navigator.language;
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat('pt-PT', options).format(now);
// labelDate.textContent = new Intl.DateTimeFormat(
//   `${currentAccount.locale}`,
// ).format(now);

*/

///////////// Internationalizing Numbers (INTL) /////////////

/*

const num = 3112356.23;

// US 3,112,356.23
console.log('US: ', new Intl.NumberFormat('en-US').format(num));

// Germany 3.112.356,23
console.log('Germany: ', new Intl.NumberFormat('de-DE').format(num));

// Syria ٣٬١١٢٬٣٥٦٫٢٣
console.log('Syria: ', new Intl.NumberFormat('ar-SY').format(num));

// Browser
console.log('Browser: ', new Intl.NumberFormat(navigator.language).format(num));

/*
// Bowser
console.log(
  'Bowser: \n',
  `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀   ⠀       ⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠲⣄⢀⡀⠀⠀⠀⠀⠀⠀⢀⠄⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡄⠈⠳⣕⢄⠀⠀⠀⠀⢠⣏⠀⠀⣹⡆⠀⠀⠀⠀⠀⠀⣀⡀⣀⠀⠀⠀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⢸⡿⡷⣄⣤⣾⣿⣯⣿⣿⣿⣧⡀⠀⠀⢀⠀⠀⠈⣻⣿⣻⢿⣶⢿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⠀⡖⣯⢳⣿⣿⣿⡟⠛⡞⣿⣽⣿⣿⣧⣼⠃⢸⣧⣷⣿⡟⣷⣯⡟⣾⢻⡞⣿⡆⠀⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠠⠤⣀⡀⠀⠀⠀⠀⣀⣼⣧⠽⠒⠋⠉⠉⠉⠉⠉⠙⠓⠿⠿⠛⠋⠉⣄⠀⢻⣿⣿⡿⣽⣳⢯⡿⣽⢯⡿⣽⣷⠀⠀⠀⠀⢸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠱⡀⠀⠈⠉⢓⢾⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣿⡄⠀⠐⢹⣿⡷⣯⢿⡽⣯⢿⡽⣷⣿⠀⢀⣤⣷⣼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⢦⠀⣠⢯⡿⠋⠀⠀⠀⠀⢀⣀⠀⠀⢀⣠⣆⣴⡄⣀⠀⢄⠂⠄⡷⠻⣦⣤⣾⣿⣽⣯⡿⣽⢿⣾⡉⢏⡿⣿⣿⣻⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢿⣵⠟⠀⢀⡠⠔⠚⠉⣡⡈⠉⠉⠛⠻⣿⣿⣿⣷⣮⣦⣴⣾⣷⣿⠿⠿⠾⣌⣛⡟⠉⣻⣯⣿⣧⠨⣽⣿⣞⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⠏⠀⡔⠁⠀⠀⠀⣀⢴⣹⠶⢳⣀⠀⢻⣿⣛⡹⠿⠿⣿⣭⠝⠀⠀⠀⠀⠈⠹⣷⣤⣿⣈⣽⣻⠵⠿⠿⣭⣿⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⣼⡟⠀⣸⠀⠀⠀⠀⣦⣾⣿⣿⣿⣿⡿⠟⠚⠋⢄⡀⠀⢰⠋⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠈⠀⠀⠐⠋⣟⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢄⡀⠀⠀⠀⠈⡷⡿⠀⠀⡇⠀⠀⢠⣮⣁⣽⣿⣿⠟⠋⠁⠀⠀⢀⠞⠻⣦⢾⣦⡾⠁⠀⢠⢶⣷⡀⠀⠀⠀⠀⠀⠈⣇⠀⠀⠀⣠⡾⣼⡟⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠉⠲⢤⣠⡴⣹⠃⠀⠀⣧⠀⢠⣾⣿⣿⣿⠏⠀⠀⠀⠱⣽⠞⢻⠦⡤⢿⣌⢿⣿⣤⠀⠈⣿⠿⣷⡄⣀⠀⠀⠀⣠⠹⣄⣠⠾⢋⡴⢇⢣⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠘⢷⡟⠀⠀⠀⣿⢤⠘⣿⣿⣿⡏⠀⢠⡀⠀⠀⣸⣷⢪⠝⣰⢃⡞⢮⣿⣿⡄⠀⢹⣶⣿⣿⣶⡴⢶⣿⣲⣯⣿⣿⡏⡙⣬⠼⠋⠀⠀⠀⠀⠀⠀⣠⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⠁⠀⠀⣸⠇⢸⣿⠏⣿⣿⡁⠀⠀⢿⣆⡾⠀⣿⣇⠹⣆⢏⡸⢆⡈⣹⣷⡀⢸⠏⢸⣿⣿⣷⣿⣿⣿⣿⣿⣾⣇⣾⢀⣶⣆⣀⣀⣀⣰⠶⡿⢱⠎⣀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠸⠀⠀⢀⡏⢀⣿⣽⠲⢾⣿⡇⠀⠠⢜⢢⠟⣦⡼⢧⢋⡖⢎⡱⠮⢵⡏⡹⡇⠀⠑⣿⡿⠛⣿⣿⣿⣿⡿⣭⣟⣹⣿⣿⣾⣿⡟⢏⡱⢌⢣⡱⢣⣫⢖⢧⣋⠖⠄
⠀⠀⠀⠀⢠⠀⠀⠀⡘⠁⣼⡿⠁⠀⠀⠉⠛⠦⣵⣎⣦⠕⢊⣀⣊⣜⠸⣏⡛⡛⠞⡹⠳⣷⠀⠀⠀⠁⠀⠋⠉⠉⠉⠀⠻⣧⣿⣿⣿⣿⢣⡙⣌⠲⣩⢲⡱⣣⠏⣎⣓⡬⠆⠀
⠀⠀⠀⠀⠎⠀⠀⠠⠁⢠⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⢢⡔⡿⠀⠑⠨⠙⠶⣥⣆⣑⠌⢣⡀⠀⠀⠀⢀⠀⣀⠂⣄⡾⢩⣿⣹⣻⣿⠋⠛⠛⠶⣇⢇⡚⡥⢞⡭⣚⠼⣱⡀
⠀⠀⠀⠀⣽⠀⠀⠄⢐⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠑⣌⠳⣼⡅⠈⡲⢦⣉⠒⡰⢈⠉⡉⢉⣽⡷⣶⣟⡛⠻⢤⡃⠊⡤⣞⣿⣿⣿⣿⣆⠀⠀⣠⠞⢾⡴⡙⡮⠆⠉⢚⠀⠃
⠀⠀⠀⠀⣯⠽⠖⠖⢻⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⢌⠻⣜⢛⢦⡁⢆⡉⡙⠁⠂⠀⣴⡞⢯⡜⢧⡹⣛⣦⡀⠉⠓⠛⠶⠾⣿⣿⣿⣿⣷⣦⣽⣦⣤⠷⠋⠁⠀⠀⠀⠀⠀
⢀⣠⠴⠚⠁⢠⠠⡀⠼⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢌⢣⡝⡌⠦⡉⢆⡐⠄⠁⣴⣞⠳⣜⢣⠞⣥⠳⣍⠞⣵⡀⠀⠀⠀⠀⠀⠉⠙⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⠻⢦⣱⣌⢢⡑⣌⠲⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠌⡜⡲⠜⢨⠓⠈⢄⣠⣴⢛⢧⠪⡝⣌⢧⣋⠶⡹⢌⡻⢼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⠉⠉⠉⢉⡇⠀⠀⠀⠀⠀⠀⠀⠀⡀⢢⠑⡬⢱⢩⠟⠙⠛⠛⠒⣳⢏⠶⣙⠼⣘⠦⣍⢮⡱⣍⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡎⠀⠀⠀⠀⠀⠀⠀⠄⢢⢅⢣⠚⡔⢣⠏⠀⠀⠀⠀⠀⣟⢎⡳⣉⠮⢥⢫⠴⣢⢓⢾⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⢀⠇⡸⢃⠼⡘⠟⣸⠟⠀⠀⠀⠀⠀⢸⣛⡜⢣⡛⡼⣃⢟⡼⣣⢟⡻⢼⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢰⠃⠀⠀⠀⠀⠠⠨⣐⢪⢑⡋⣎⣱⠽⠃⠀⠀⠀⠀⠀⠀⣿⢄⡏⢧⡙⢶⠩⡞⢴⢣⠎⣽⡷⣿⣻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⠀⠀⠀⠀⠀⠀⠀⠀⠈⠈⣏⠉⣻⣆⠀⠀⠀⠀⠀⠀⠀⠈⠚⠾⠧⠾⠥⠿⠼⠾⠾⠽⠾⠓⠓⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⠦⣀⠀⢀⡤⠒⢦⣠⠖⠚⣟⡎⠙⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠑⠒⠤⠞⠻⠦⢄⡟⠋⠒⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`,
);


// With options and unit (read docs for different units)

// style: unit, percent, currency
// we HAVE TO set currency property manually
const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};
// US 3,112,356.23
console.log('US: ', new Intl.NumberFormat('en-US', options).format(num));

// Germany 3.112.356,23
console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));

// Syria ٣٬١١٢٬٣٥٦٫٢٣
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options).format(num));

// Browser
console.log(
  'Browser: ',
  new Intl.NumberFormat(navigator.language, options).format(num),
);

*/

///////////// TIMERS: setTimeout and setInterval /////////////

/*

// setTimeout
// first argument - callback function that will execute after timer
// second argument - time after which function will execute (in milliseconds)
// all next arguments will be passed in callback function as arguments

const ingredients = ['olives', 'spinach'];
pizza = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients,
);
console.log('Waiting...');

// setTimeout does NOT stop execution of a code and it will continues
// it is asynchronous JS

// We can stop execution with clearTimeout(), passing result of setTimeout function (our timer) to it
if (ingredients.includes('spinach')) {
  clearTimeout(pizza);
  console.log('Pizza contains spinach, we will not cook it');
}

// setInterval
// first argument - callback function, just like in setTimeout
// second argument - interval in which function will be executed
// all next arguments will be passed in callback function as arguments

setInterval(function () {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  const seconds = new Date().getSeconds();
  console.log(`${hours}:${minutes}:${seconds}`);
}, 1000);

*/
