'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// Helper render functions

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000_000).toFixed(1)} millions people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// AJAX CALL: XMLHttpRequest (the most old school one)

/*

const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  // opening request and giving it url
  request.open('GET', `https://restcountries.com/v2/name/${country}`);

  // sending a request
  request.send();
  // we can't just set a variable to the result, because the result is not there yet (request is asynchronous)

  // so we creating a callback for 'load' event (which will be emitted by request when it's done)
  request.addEventListener('load', function () {
    // this keyword is a request (obviously)
    // response in a property responseText and ofc we can't set it before data arrived (so before event is emmited)
    // console.log(this.responseText);

    // we are getting info in json format, so we need to convert it
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
        <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000_000).toFixed(1)} millions people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;
    countriesContainer.style.opacity = 1;
    countriesContainer.insertAdjacentHTML('beforeend', html);
  });
};

getCountryData('Ukraine');
getCountryData('China');
getCountryData('USA');
getCountryData('Germany');

*/

///////////////////////////////////////
// Callback Hell (Chaining AJAX requests)

/*

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000_000).toFixed(1)} millions people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`;
  countriesContainer.style.opacity = 1;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data);

    // Get neighbour country
    const neighbour = data.borders?.[0];

    if (!neighbour) return;
    // AJAX call country2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      // Render country 2
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('Ukraine');
getCountryAndNeighbour('Canada');

// In summary - to create a callback after callback, we need to put the second one in the first (like in example above)
// It may be needed when we want to do an XMLRequest only after other XMLRequest is loaded (there's a lot of usecases for this - e.g. we want to
// load some data based on other API data from backend).
// Then, if we have a chain of requests like this, we need to put a callback in a callback in a callback in a callback in a...
// That's called callback hell
// That's happens for all asynchronous tasks that we want to put in sequence (any of them, setTimeout too)

// Callback hell and PYRAMID OF DOOM
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
    }, 1000);
  }, 1000);
}, 1000);

*/

////////////////////////////////////////////////////////////
// Promises and the Fetch API (ES6)

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// A new way to do it
// There is more options we can specify in the fetch function, but that's enough for a simple GET request

// const request = fetch(`https://restcountries.com/v2/name/portugal`);

// Immediately returns a Promise
// console.log(request);

// Promise is an object that is used basically as a placeholder for the future result of asynchronous operation (formal definition)

// We can say that a promise like a container for an asynchronously delivered value

// Basically a container/placeholder for a future value
// Perfect example: response from AJAX call

// Good analogy is a lottery ticket - a promise that you'll receive money if you guess correct outcome
// (more like this in a lecture pdf/video)

// With promises we no longer rely on events and callbacks passed into async functions to handle async results (that can sometimes cause unpredictable results)

// Also we can chain promises with async operations instead of nesting callbacks (and escape callback hell)

// The Promise lifecycle (they are time-sensitive and change over time)
// Promise can be in different states:

// Pending: before the future value is available (during this time async task doing work in the background)
// Settled: async task is finished.
// Settled can be fulfilled or rejected
// Fulfilled: success, value of promise is now available
// Rejected: an error happened during async task (user is ofline, for example)

// With lottery analogy: pending - we are waiting for lottery draw, fulfilled - we guessed the correct outcome and we won, rejected - we guessed wrong and we lost
// Ofc we are able to handle these results and do smth

// Promise is only SETTLED ONCE and from there state will remain unchanged forever

// Use a promise called Consume Promise
// We consume a promise when we already have a promise, but first we must to build it (fetch() creating a promise, for example)

///////////////////////////////////////
// Consuming Promise

// const request = fetch(`https://restcountries.com/v2/name/portugal`);
// console.log(request);

/* (with explanations and logs)

const getCountryData = function (country) {
  // will return a pending Promise
  // then() is the method available on all promises, so we can call it
  // (we need to pass a callback function that will be executed when Promise fulfilled) and has one "result" argument with resulting value of fulfilled promise

  const request = fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      // response body is a ReadableStream object, in order to get data we need to call JSON method on response
      // json() method is also an async function so also will return a promise,
      return response.json();
    })
    // so we need to handle it (return result of response.json()) with another then after
    .then(function (data) {
      // and there's our data (the same as before)
      console.log(data);
      renderCountry(data[0]);
    });
};

*/

// Clean version (with arrow functions and without logs)
// Promises do not get rid of callbacks, but get rid of callback hell

/*

const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData('portugal');

*/

////////////////////////////////////////////////////////////
// Chaining promises

/*

const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      // to get a neigbour country we need to do a second AJAX call
      const neighbour = data[0].borders?.[0];

      // won't going to work bc error handling in promises is different
      if (!neighbour) return;

      // Country 2
      // We can return a new promise (from fetch) and handle it in next chain method (then)
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
      // also then() ALWAYS returns a promise, but if we do return a value, that value will become the fulfilled value of the returned promise
      // return 23; // then we can handle it in the text then, like .then(data => alert(data)); will show us 23

      // we can do it and it will work, BUT it's still create CALLBACK HELL (promise on a promise)
      //  return fetch(`https://restcountries.com/v2/alpha/${neighbour}`).then(response => response.json());
    })
    // Once again, it works and we need to unpack that data too (with json() and second promise handler)
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

// Instead of callback hell we have a flat chain of Promises

getCountryData('portugal');
getCountryData('germany');

*/

////////////////////////////////////////////////////////////
// Handling rejected promises

/*

const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    // .catch(err => console.error(`${err} !!!`));
    .catch(err => {
      console.error(`${err} !!!`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('poland');
});

getCountryData('asdasda');

*/

// There are 2 ways of handling rejections
// 1) pass a second callback function in then() - it will be called on rejected promise (first callback - success, second callback - reject)
// This callback function has one argument that is an error itself (handling the error - catching the error)
// 2) use catch() method in the chain, that allows us to catch errors globally (add the catch() in the end of the chain)
// will basically catch any errors that occur in any place in promise chain
// (so error propagates down the chain, well mechanism similar to exceptions)

// Error is a javascript object, so we can create errors and any error contains message property

// Besides then and catch, there's also a finally message (just like exceptions fr fr)
// Finally will be called always (maybe the same principle like it can't be called only if stack overflow/engine error but not sure about that)
// Make sense that it can be used to close connection if it's a thing in js (ok a simpler one is to hide a loading spinner)

// so catch() also returns a promise (if finally works anyway)

// With 404 Promise will still be fulfilled, so we won't get an error of 404, but will get an error of code that can't be executed (undefined, can't find property etc)
// so for this we need to throw errors manually (once again like exceptions frfr)

////////////////////////////////////////////////////////////
// Throwing Errors manually

// response object has different properties, one of them is boolean "ok" (also it has .status), we can use this (ok === false with 404 status code)
// basically new Error and things like that are also constructor functions... never thought about that

// Effect of creating and throwing an error - a promise will immediately reject
// ofc reject and error will propagate to catch

// OF COURSE WE SHOULD HANDLE ERRORS
// 1. it's the only way to display an error to a user
// 2. leave rejected promises without handling is a BAD practice

/*

const getCountryData = function (country) {
  const request = fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log(response);

      // throwing error manually
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders?.[0];

      const neighbour = 'asdasdsd';
      if (!neighbour) return;
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} !!!`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('poland');
});

*/

// getCountryData('asdasda');

/*

// We can create a helper function with fetching and conversion to json, catching errors etc (encapsulate it)
// this function will return a promise (that we can call just like any other promise in our chain)
const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  const request = getJSON(
    `https://restcountries.com/v2/name/${country}`,
    'Country not found',
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      // doesn't really do anything because a promise still fulfilled
      // if (!neighbour) return;
      if (!neighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found',
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} !!!`);
      renderError(`Something went wrong: ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});

*/

///////////////////////////////////////
// Event loop

/*

// I will write about it in my journal not here (but I might reconsider lately idk)

/*
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');

// Test start
// Test end
// Resolved promise 1
// 0 sec timer

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

// Test start
// Test end
// Resolved promise 1
// Resolved promise 2 (no matter how long it'll take)
// 0 sec timer

*/

///////////////////////////////////////
// Building a Promise

/*

// creating a Promise using constructor with 1 argument- executor function
// As soon as Promise constructor runs, it will execute the function and pass 2 arguments: resolve and reject functions
// executor function will contain async behavior and produces result value
const lotteryPromise = new Promise(function (resolve, reject) {
  // It's not really async yet, so we are adding a timer to simulate it
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // calling resolve will make promise fulfilled (passing result for next handlers)
      resolve('You WIN');
    } else {
      // calling reject will make promise rejected (passing error message or creating a new error object)
      reject(new Error('You LOSE'));
    }
  }, 2000);
});

// Consuming a Promise

lotteryPromise
  .then(result => console.log(result))
  .catch(err => console.error(err));

// Promisifying - converting callback-based async to promise-based

// Promisifying setTimeout()
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Consuming a promise

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 more second'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
  });

// Creating fulfilled/rejected promise immediately

// Basically static methods
Promise.resolve('abc').then(x => console.log(x));
Promise.reject('abc').catch(x => console.error(x));

*/

///////////////////////////////////////
// Promisifying

/*

navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err),
);
console.log('Getting position');

// Promisification of code above (Geolocation API)
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   // once again, that will be the resolved value
    //   position => resolve(position),
    //   // and that will be an error
    //   err => reject(err),
    // );

    // and we can simply do this (since getCurrentPosition accepts 2 callback functions for position and error, and resolve/reject indeed are callback functions)
    // so they'll be called by getCurrentPosition()
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Handling the result (consuming a Promise)
getPosition().then(result => console.log(result));

// We can do smth like that and use promisified functions like this (getPosition().then() to work with result of getPosition() and then return new promise from fetch, do the chain etc)

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { lattitude: lat, longitude: lon } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`,
      );
    })
    .then(response => {
      if (!response.ok) throw new Error(`Forbidden: ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return fetch(`https://restcountries.com/v2/alpha/${data.countryCode}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`Not found: ${response.status}`);
      return response.json();
    })
    .then(data => {
      renderCountry(data);
      countriesContainer.style.opacity = 1;
    })
    .catch(err => console.error(err.message));
};

btn.addEventListener('click', whereAmI);

*/

///////////////////////////////////////
// Consuming Promises with async/await

// we start by creating a special async function
// we are making function async just with async word before function

// now this function is asynchronous and will keep running in background, and when it's done it will automatically return a promise

// inside async we can have one or more await statements

// (basically similar syntax to C# that far)

// we can use await to basically await for result of promise
// it will stop execution until the promise is fulfilled

// it won't block the code, because function is async and running in the background, so it don't blocking a main thread (call stack)

// async/await makes our code looks like a regular one, but it's async functionality

// async/await is simple a SYNTHETIC SUGAR over 'then' in promises and behind the scene it's still using the promises (similar to classes like it's hiding js functionality)
// in case of async/await we are simply consuming them differently

// async function will ALWAYS return a Promise

/*

// async/await is only about consuming promises, not building them
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

*/

/* WITH COMMENTS
const whereAmI = async function (country) {
  // it's simply the same as
  // fetch(`https://restcountries.com/v2/name/${country}`).then(res =>
  //   console.log(res),
  // );

  // when promise is resolved, value of this await expression will be a resolved value of a promise that we can store
  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  console.log(res);
  // .json() returns a new promise, so we need to use await there too (and can simply do it to save result directly)
  const data = await res.json();
  renderCountry(data[0]);
};
*/

/*

// whereAmI async function from before with awaits
// As we can see, it looks cleaner and simplier
// Also we can save any promise result in a variable and then use it as usual
const whereAmI = async function () {
  // Geolocation
  const pos = await getPosition();
  const { lattitude: lat, longitude: lon } = pos.coords;

  // Reverse geocoding
  const resGeo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`,
  );
  const dataGeo = await resGeo.json();

  // Country data
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.countryName}`,
  );
  console.log(res);
  const data = await res.json();
  renderCountry(data[0]);
};

// FIRST will be printed first, because it's async function and event loop rules still apply (funciton will work in the background)
whereAmI();
console.log('FIRST');

// async/await used a lot together with .then() method of consuming promises

*/

///////////////////////////////////////
// Error handling with try...catch

// we can't use the .catch() like before with async/await, because we can't attach it anywhere
// so we use a try catch statement
// it's actually used in regular JS as well and has been there a long ago

/*

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  // we are trying to execute code and waiting for mistakes
  try {
    const pos = await getPosition();
    const { lattitude: lat, longitude: lon } = pos.coords;
    // we don't need to throw an error manually, because our promise from getPosition() automatically rejects in the case of error
    // (and we will get an error that will be catch in a catch block)

    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`,
    );
    if (!resGeo.ok)
      // we are handling errors like before with throwing new error after checking condition
      throw new Error('Something went wrong with getting location data!');

    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryName}`,
    );

    if (!res.ok)
      throw new Error('Something went wrong with getting country data!');

    console.log(res);
    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    // in the catch block we can handle any errors, just like in the catch method
    // fetch promise does not reject on a 404/403, so errors there without any throws will be about undefined properties when we trying to use country properties for render
    // (and not the original error that we are getting from API/fetch)
    console.error(err);
    renderError(`Something went wrong !!! ${err.message}`);
  }
};

whereAmI();

*/

// Usual try catch construction, catch block will have access to any occured error
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   console.log(err.message);
// }

///////////////////////////////////////
// Returning Values from Async Functions

/*

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  try {
    const pos = await getPosition();
    const { lattitude: lat, longitude: lon } = pos.coords;
    // Reverse geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`,
    );
    if (!resGeo.ok)
      throw new Error('Something went wrong with getting location data!');
    const dataGeo = await resGeo.json();
    // Country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.countryName}`,
    );
    if (!res.ok)
      throw new Error('Something went wrong with getting country data!');
    const data = await res.json();
    renderCountry(data[0]);

    // returned value will become a fulfilled value of a promise that will be returned by the function
    return `You are in ${dataGeo.city}, ${dataGeo.countryName}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong !!! ${err.message}`);

    // Reject promise returned from async function (so our then and catch methods in global code will work correctly)
    throw err;
  }
};

*/

/*

console.log('1: Will get location');

// Pending promise, so our returned value will be in result of a Promise
// const city = whereAmI();
// console.log(cityString);

// So we need no to this instead and consume a returned Promise
// Even if a function has errors, returned Promise will still be fulfilled anyway and this then code will be executed
// to fix that we have to rethrow the error again and manually reject a Promise in a function (line 806)


whereAmI()
  .then(city => console.log(city))
  // catch won't work, then() callback still will be executed instead of a catch (we will have undefined/smth like this, not error message)
  .catch(err => console.error(err.message))
  .finally(() => console.log('3: Finished getting location'));
*/

// We move this code into finally method if we want it always be executed and be executed AFTER async function result
// console.log('3: Finished getting location');

// logs, and only after them async function (it's still an async in a background)

// We can convert code about in only async await code and treat returned Promise treating returned Promise just like any other

// We can't use await outside the async function (there is proposal but we can't now), so await CAN ONLY BE USED IN await function

// so for this we can use IIFE (it's one of the last remaining usecases of IIFE's)

/*

(async function () {
  console.log('1: Will get location');
  // regular try catch syntax
  try {
    // regular async await syntax
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log('3: Finished getting location');
  }
})();

*/

//https://restcountries.com/v2/name/portugal

///////////////////////////////////////
// Running Promises in parallel

/*

const get3Countries = async function (c1, c2, c3) {
  try {
    // We are running all these calls one after another, even though their results are independable (second waits for first to finish)
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // For running requests in parallel, we use Promise.all() combinator function
    // This function takes in an array of Promises and return a new Promise, which will run all the Promises in the array at the same time
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    // If one of the Promises rejects, then whole Promise (returned by Promise.all()) rejects as well
    // Promise.all short-circuits when one Promise rejects (one rejected Promise is enough for Promise rejects as well)
    // we totally SHOULD do this and run Promise in parallel in suitable situations, because it will shorten loading time
    // We can use Promise Combinators with then() as well

    // console.log(data1.capital, data2.capital, data3.capital);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

get3Countries('canada', 'austria', 'germany');

*/

///////////////////////////////////////
// Other Promise Combinators: race, allSettled, any
// all receives an array of Promises and return a Promise

// Promise.race()
// Receives an array of Promises and returns a Promise settled as soon as one of the input array Promises is settled (value is available, no matter it's rejected or fulfilled)
// Basically the first settled Promise win the race

// If the winning Promise is a fulfilled Promise, fulfillment value of race Promise will be a fulfillment value of the winning Promise
// resolve of Promise.race() === resolve of first fulfilled Promise from an array
// We get only one result, and not an array with results of 3
// Rejected Promise can also win the race, and then result will be rejected as well

// Promise.race() short-circuits when any of the Promises is settled

/*

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/Italy`),
    getJSON(`https://restcountries.com/v2/name/Egypt`),
    getJSON(`https://restcountries.com/v2/name/Canada`),
  ]);
  console.log(res[0]);
})();

// Example of timeout (if user's connection is slow and loading taking too long) with Promise.race()

// Timeout promise
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    // simply returning a reject from Promise if loading longer than given seconds
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

// if request is longer than timeout, we catch an error from timeout instead of fulfilment value of request
Promise.race([getJSON(`https://restcountries.com/v2/name/poland`), timeout(1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled() (ES2020)
// Again, takes in an array of Promises and then returns an array of all SETTLED Promises (no matter if Promise a rejected or not)
// Similar to Promise.all() as also returns an array of results, but neve short-circuits and simply return all the results of all the Promises

// Will return an array with results of all the 3 Promises (even rejected one)
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

// Promise.any() (ES2021)
// Takes in an array of multiple Promises and then return a first FULFILLED Promise
// It will ignore rejected Promises
// Similar to Promise.race(), but ignores rejected Promises (unless all of them reject)
// If all Promises reject, it will return an error about it (AggregateError: All promises were rejected)

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

*/
