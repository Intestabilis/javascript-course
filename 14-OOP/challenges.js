///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

/*

function Car(make, speed) {
  this.make = make;
  this.speed = speed;

  // it WILL work, but we shouldn't do it because it will reassign functions at every constructor call
  // Yes, garbage collector will collect old unused functions, but it's still consumes more recourses on a runtime (I think, at least)

  // Car.prototype.accelerate = function () {
  //   this.speed += 10;
  //   console.log(this.speed);
  // };
  // Car.prototype.brake = function () {
  //   this.speed -= 5;
  //   console.log(this.speed);
  // };
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

console.log(BMW, Mercedes);

console.log('BMW goes vroom-vroom');
BMW.accelerate();
BMW.brake();
BMW.accelerate();

console.log('Mercedes goes vroom-vroom');
Mercedes.accelerate();
Mercedes.accelerate();
Mercedes.accelerate();
Mercedes.accelerate();
Mercedes.brake();
Mercedes.brake();
Mercedes.accelerate();

*/

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

/*

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} car is accelerating to ${this.speed} km/h!`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} car is slowing down to ${this.speed} km/h!`);
  }

  get speedUS() {
    return +(this.speed / 1.6).toFixed(2);
  }

  set speedUS(speedUS) {
    this.speed = +(speedUS * 1.6).toFixed(2);
  }
}
const ford = new CarCl('Ford', 120);

// class methods

ford.accelerate();
ford.accelerate();
ford.brake();
ford.accelerate();
ford.brake();

// getter and setter
console.log(ford.speedUS);
ford.speedUS = 100;
console.log(ford.speedUS);

*/

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/*

function Car(make, speed) {
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} car is accelerating to ${this.speed} km/h!`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} car is slowing down to ${this.speed} km/h!`);
};

function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}

// so basically we creating an empty object with prototype set to given to Object.create and assigning EV prototype to this object
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} car is accelerating to ${this.speed} km/h, with a  charge of ${this.charge}!`,
  );
};

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

const tesla = new EV('Tesla', 120, 23);

tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.chargeBattery(90);
tesla.accelerate();

// just to be sure

console.log(tesla.__proto__);
console.log(tesla.__proto__ === EV.prototype);
console.log(EV.prototype.__proto__);
console.log(EV.prototype.__proto__ === Car.prototype);
console.log(EV.prototype.constructor === EV);

*/

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/*

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} car is accelerating to ${this.speed} km/h!`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} car is slowing down to ${this.speed} km/h!`);
    return this;
  }

  get speedUS() {
    return +(this.speed / 1.6).toFixed(2);
  }

  set speedUS(speedUS) {
    this.speed = +(speedUS * 1.6).toFixed(2);
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} car is accelerating to ${this.speed} km/h, with a  charge of ${this.#charge}!`,
    );
    return this;
  }

  chargeBattery = function (chargeTo) {
    this.#charge = chargeTo;
    return this;
  };
}

//  DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

rivian = new EVCl('Rivian', 120, 23);

rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .brake()
  .chargeBattery(50)
  .accelerate()
  .accelerate();

console.log(rivian.speedUS);

*/
