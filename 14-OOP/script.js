'use strict';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// CONSTRUCTOR FUNCTIONS, NEW OPERATOR, PROTOTYPES, PROTOTYPAL INHERITANCE, PROTOTYPE CHAIN //////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

///////////////////// CONTRUCTOR FUNCTIONS AND THE NEW OPERATOR /////////////////////
// Constructor function
// Function expression and declaration work as constructor function, but not arrow (because they don't have their own this keyword)
const Person = function (firstName, birthYear) {
  // {}
  console.log(this);
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // return happens

  // Never do this, each of this object will have a copy of this function
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };

  // We can use prototypes and prototypal inheritance for this
};

// Only difference - we call these functions with new
const jonas = new Person('Jonas', 1991);
console.log(jonas);

// How constructor functions work:
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// instanceof checks a "class"
console.log(jonas instanceof Person);

///////////////////// PROTOTYPES /////////////////////

console.log(Person.prototype);

// every object that created with contructor function will inherit prototype property
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// and have access to prototype's methods
jonas.calcAge();
matilda.calcAge();

// each object has special property __proto__, that references the prototype of object
console.log(jonas.__proto__);

// object's .__proto__ === constructor function .prototype
// true
console.log(Person.prototype === jonas.__proto__);

// .prototype is NOT a prototype of a function, but it's what gonna be used as a prototype of objects created by function
// false
console.log(Person.__proto__ === Person.prototype);
// the same as
console.log(Person.prototype.isPrototypeOf(Person));

// We can also check if smth a prototype with isPrototypeOf(object)
console.log(Person.prototype.isPrototypeOf(jonas));

// basically .prototype is kinda bad and incorrect naming, but we can't do anything about it

// We can also set properties on a prototype

Person.prototype.species = 'Homo sapiens';

// Objects also inherit these properties
console.log(jonas.species, matilda.species);

// We can check if property is object's like that
// true
console.log(jonas.hasOwnProperty('firstName'));
// false
console.log(jonas.hasOwnProperty('species'));

///////////////////// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS /////////////////////

// Prototype chain

// Person.prototype
console.log(jonas.__proto__);
// Object.prototype (top of the prototype chain)
console.log(jonas.__proto__.__proto__);
// null
console.log(jonas.__proto__.__proto__.__proto__);

// Person (point back to constructor function)
console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 5, 63, 12, 6, 6, 6, 6];

// Array.prototype (with all arrays methods like map, filter, reduce etc)
console.log(arr.__proto__); // [] === new Array, just like {} === new Object
// true (once again)
console.log(arr.__proto__ === Array.prototype);

// Object.prototype
console.log(arr.__proto__.__proto__);

// We actually CAN add new methods like this and then all arrays can use it
// But generally it's not a good idea (obviously): 1) next version of js can add method with this name, but works differently 2) it won't work in a team
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
// prototype of h1 will be HTMLHeadingElement, so DOM types works exactly because of it (and methods are working thanks to prototype inheritance and chain)
console.dir(h1);

// Functions are also objects, so they have a prototype too
// Prototype of functions contains methods like apply, bind, call, so that's the reason why we can use them
console.dir(x => x + 1);

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// ES6 CLASSES, SETTERS AND GETTERS, STATIC METHODS, OBJECT.CREATE ///////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// ES6 CLASSES /////////////////////

// Classes in JS are basically a synthetic sugar over prototypal inheritance

/*

// class expression (works just like with the functions)
// const PersonCl = class {}

// class declaration
class PersonCl {
  // works similar to constructor function, but a method of a class (must be called constructor)
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // methods will be added to a .prototype property of a class
  // Behind the scenes all class methods will be to a prototype of objects (well, prototypal inheritance)
  // method of a class
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  // greet() {
  //   console.log(`Hey, ${this.firstName}`);
  // }
}

// works like constructor functions (and visually as normal OOP languages)
const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);

jessica.calcAge();

// true, "class" works like function constructor, but with a nicer syntax
console.log(jessica.__proto__ === PersonCl.prototype);

// This also works
PersonCl.prototype.greet = function () {
  console.log(`Hey, ${this.firstName}`);
};

jessica.greet();

// 1. Classes are NOT hoisted, even class declarations
// 2. Classes are first-class citizens (we CAN pass them into functions and return them)
// 3. The body of a class are ALWAYS executed in strict mode

*/

///////////////////// SETTERS AND GETTERS /////////////////////

/*

const account = {
  owner: 'Jonas',
  movements: [200, 125, 530, 300],

  // getter
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // setter
  // every setter needs to have EXACTLY ONE parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};

// We don't call getters and setters as methods, but simply read them as a properties
console.log(account.latest);

// So for setters we also set them as any other property
account.set = 150;

console.log(account.movements);

// Classes are also can have getters and setters

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Setters and getters useful for data validation (well, like in other languages)

  // We should use a different variable name, 1) it's a convention 2) if we don't do this, then it will create endless recursion (fullName calls fullName to set the
  // name that calls fullName to set the name that calls...)
  // also we should do it when a property already exists (I'm not sure about that one since how can we access it after creating a getter?)
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }
  // to access this property more easily, we should create a getter for it

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);

console.log(jessica.age);
console.log(jessica.fullName);

// will create an error (alert)
// const walter = new PersonCl('Walter', 1965);

const walter = new PersonCl('Walter White', 1965);
console.log(walter.fullName);

*/

///////////////////// STATIC METHODS /////////////////////

// A good example - Array.from()
// This method is attached to the entire Array construction, and not to a prototype property (we can't do [1, 2].from())
// from() method in the Array namespace (we are attaching the function to the constructor function, so we understand that this functionality belongs to arrays)
// Usually used as helpers that related to certain constructors

/*

const Person = function (firstName, birthYear) {
  console.log(this);

  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Adding a static method to a Person constructor function

Person.hey = function () {
  console.log(`Hey there`);
  // constructor function since it's calling a method itself
  console.log(this);
};

// Calling a static method
Person.hey();

// They are not inherited
// jonas.hey(); // error

// Adding a static method to a PersonCl class

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // we simply use static keyword
  // Static method, won't be added to a prototype property
  static hey() {
    console.log(`Hey there`);
    console.log(this);
  }
}

const jonas = new Person('jonas', 1991);

// Calling a static method
PersonCl.hey();

*/

///////////////////// OBJECT.CREATE /////////////////////

// works in a different way - still the idea of prototypal inheritance, BUT
// no prototype property involved, no constructor functions, no new operator

// we can use Object.create() to manually set the prototype of an object to any other object

/*

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // method to set properties on creation in a better way
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
  // it is NOT a constructor function since we don't use new to use this method
};

// it will return a new object that will be linked to a prototype object (steven.__proto__ === PersonProto)
const steven = Object.create(PersonProto);
console.log(steven);
// true
console.log(steven.__proto__ === PersonProto);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

// In practice it's the least used way to implement prototypal inheritance, but good to know
// Also we will need it to order to implement inheritances between classes

// We can set properties in a better way
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////// INHERITANCE BETWEEN "CLASSES": CONSTRUCTOR FUNCTIONS, ES6 CLASSES, OBJECT.CREATE ///////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// INHERITANCE BETWEEN "CLASSES": CONSTRUCTOR FUNCTIONS /////////////////////

/*

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // This doesn't work because we are calling it as a regular function (without a new), so this keyword is undefined
  // Person(firstName, birthYear);

  // it works because we specify this (this === {}, empty object that is created by a new operator, so we are setting properties on this new object)
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// For class inheritance we want to make Person.prototype the prototype of Student.prototype
// so set Student.Prototype.__proto__ to Person.prototype (I almost had a stroke)
// To link these prototype object's we use Object.create()

// Linking prototypes

// We can't do this, because it will change reference, so Student objects __proto__ will be linked directly to Person.prototype
// Student.prototype = Person.prototype;

// We had to create this connection BEFORE adding any more methods, because Object.create() will return an empty object
// at this point Student.prototype is empty with __proto__ set to Person.prototype
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

// Person.prototype (incorrect setted .prototype.constructor, but in prototype chain all is correct)
console.log(mike.__proto__);
// Person.prototype
console.log(mike.__proto__.__proto__);

// true
console.log(mike instanceof Student);
// also true (because of inheritance and setted prototype of prototype)
console.log(mike instanceof Person);

// We should fix it to point back to the student
// The reason of that - We set the prototype of Object.create(), so the constructor of Student.prototype is still Person
console.dir(Student.prototype.constructor);

// Fix
Student.prototype.constructor = Student;

*/

///////////////////// INHERITANCE BETWEEN "CLASSES": ES6 CLASSES /////////////////////

// Works just like the previous one internally, just with prettier syntax
// To implement inheritance between ES6 classes we need 2 things: extends keyword and super() function

/*

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey, ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there');
  }
}

// extends link the prototype behind the scenes
class StudentCl extends PersonCl {
  // If our subclass does not have any new parameters, we can simply omit constructor (do not create it at all)
  // Then super() function will be called automatically with all given arguments

  constructor(fullName, birthYear, course) {
    // We don't need to do this manually
    // PersonCl.call(this, fullName, birthYear);

    // Instead we call super(), ALWAYS needs to happen first! (super() call is responsible for creating this keyword in subclass)

    // super() is basically the constructor function of the parent class (idea the same, it's just happening automatically)
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Method overriding
  calcAge() {
    console.log(
      `I'm ${2037 - this.birthYear} years old, but as a student I feel more like ${2037 - this.birthYear + 10}`,
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
console.log(martha);

martha.introduce();
martha.calcAge();

// true
console.log(martha.__proto__.__proto__ === PersonCl.prototype);
console.log(martha.__proto__.constructor === StudentCl);

*/

///////////////////// INHERITANCE BETWEEN "CLASSES": OBJECT.CREATE /////////////////////

// Absolute same principle as before, we are just using obly Object.Create, so defining/overriding init methods and other stuff manually after creating our prototype object (StudentProto)

/*

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);

jay.init('Jay', 2010, 'Computer Science');
console.log(jay);

jay.introduce();

// Also works thanks to the prototype chain
jay.calcAge();

// With this technique we are not faking classes and just linking objects together

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////// A FEW MORE THINGS ABOUT CLASSES, ENCAPSULATION, CHAINING METHODS ///////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// A FEW MORE THINGS ABOUT CLASSES /////////////////////

/*

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;

    // we can create more properties that are not based on any inputs
    this.movements = [];
    this.locale = navigator.language;

    // actually, we can execute any code that we want in this constructor
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface (API)
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    // We can call other methods with this keyword
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log('Approved');
    }
  }

  // mock
  approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// We can do this, but it's not a good idea
// Better create methods to interact with these properties (well OOP style)
// acc1.movements.push(2500);
// acc1.movements.push(-2500);

acc1.deposit(250);
acc1.withdraw(-140);

acc1.requestLoan(1000);

// We shouldn't have access to this method
acc1.approveLoan(1000);

console.log(acc1);

//it shouldn't be accessible (since it is password)
console.log(acc1.pin);

*/

//

///////////////////// ENCAPSULATION: PRIVATE CLASS FIELDS AND METHODS /////////////////////

// Encapsulation in JS is a part of a "class fields" feature that was only introduced in 2022
// With these new features classes are no longer simply synthetic sugar and have their own functionality

// Class fields features:
// 1) Public fields (public instance fields) - will be present on all instances
// 2) Private fields
// 3) Public methods
// 4) Private methods
// 5) STATIC VERSIONS OF THESE 4 (less important, read docs) (same principle as with default static methods + private fields)

/*

class Account {
  // Declaring a public field (we DO need to specify semicolons and don't use let/const/etc)
  locale = navigator.language;
  bank = 'Bankist';

  // Declaring a private field (as in other languages, can't be accessed from outside the class)
  // For declaring a private field, we use #
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Assigning a private field
    this.#pin = pin;
    // Don't need it since we have fields
    // this.movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface (public methods)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }

  // Private methods
  // Same as with the fields, use # for making a method private
  #approveLoan(val) {
    // mock
    return true;
  }

  // Static methods
  static test() {
    console.log('TEST!');
  }

  static #test() {
    console.log('PRIVATE TEST!');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

acc1.deposit(300);
acc1.withdraw(100);

console.log(acc1);

// Can't access private fields and methods from outside (can see them in a console, but not access)
// console.log(acc1.#movements);
// acc1.#approveLoan();

*/

///////////////////// CHAINING METHODS /////////////////////

// Chaining is a common thing
// For this we should simply return the object itself in the end of every chainable method
// So we just add "return this;" in the very end of every chainable method
// Chaining methods should be called on account object (obviously)

/*

class Account {
  locale = navigator.language;
  bank = 'Bankist';
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // Public interface (public methods)
  getMovements() {
    return this.#movements;
    // Not chainable
  }

  deposit(val) {
    this.#movements.push(val);

    // return this (an object itself) allows to create chaining
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
    return this;
  }

  // Private methods
  #approveLoan(val) {
    // mock
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// Chaining methods

acc1
  .deposit(250)
  .withdraw(100)
  .withdraw(50)
  .requestLoan(25000)
  // .getMovements() //probably won't be chainable, since it returns a movement array (and it's illogical to use with these other methods)
  .withdraw(4000);

console.log(acc1);

*/
