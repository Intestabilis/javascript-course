///////////////// SELECTING, CREATING AND DELETING ELEMENTS /////////////////

/*

// Selecting entire document
console.log(document.documentElement);

// head and body
console.log(document.head);
console.log(document.body);

// Selecting elements

// Default selectors
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// These selectors are available on any element, not only document (for selecting child elements)

// getElementBy... selectors
document.getElementById('section--1');

// elements by tag
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
// returns html collection and not a node list
// if DOM changes, html collection immediately updates automatically
// Node Lists are not updating themselves automatically

// similar to previous
document.getElementsByClassName('btn');

// Creating and inserting elements
// document.createElement
// .insertAdjacentHTML (beforebegin, afterbegin, beforeend, afterend)
// .before(), .append(), .prepend(), .after()

// just creating element as a variable, but not inserting it into a page
const message = document.createElement('div');

// we can manipulate it
// both textContent and innerHTML to read/write inner content

message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

// Adding element to the DOM
// prepend - add/move the element as the first child
// append - add/move the element as the last child
// before - add/move the element as the sibling before element
// after - add/move the element as the sibling after element

// added the element
header.prepend(message);
// moved the element
header.append(message);

// message will only be inserted once, because it's a life element and can't be in multiple places simultaneously

// Adding multiple copies
// added the element
header.prepend(message);
// copied the element and added a copy
// true means that all the child elements will also be copied
header.append(message.cloneNode(true));

header.before(message);
header.after(message);

// Delete elements
// .remove() - very recent
// .parentElement.removeChild();

// message.remove();

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();

    // before remove() addition to JS
    message.parentElement.removeChild(message);
  });

  */

///////////////// STYLES, ATTRIBUTES, CLASSES /////////////////

/*

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

const message = document.createElement('div');
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

header.after(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// Styles
// element.style.propertyName - styles are applied as inline styles (styles setted directly in the DOM)
// getComputedStyle(element)

// we should write the style exactly as in CSS

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// it working only for inline styles, so we can't read any defined before styles

// Nothing
console.log(message.style.height);

// rgb(55, 56, 61)
console.log(message.style.backgroundColor);

// getComputedStyle(element)

// huge object with all of css properties
console.log(getComputedStyle(message));

console.log(getComputedStyle(message).color);
// computed style return factual style (even if it isn't defined in CSS)
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

console.log(getComputedStyle(message).height);

// CSS custom properties (CSS variables)
// CSS :root is equivalent to documentElement

// setting CSS property (variable) with setProperty
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');

// Accessing attributes as properties for standard HTML properties
console.log(logo.alt);
// also it is className instead of class for historical reasons
console.log(logo.className);

// Non-standard attributes
// it doesn't work with custom attributes (we defined it in index.hmtl)
// undefined
console.log(logo.designer);
// it works tho
// Jonas
console.log(logo.getAttribute('designer'));

// We can set attributes like that
logo.alt = 'Beautiful milimalist logo';
logo.setAttribute('company', 'Bankist');

// .attribute retuns absolute url, while getAttribute('atr') returns relative

//http://127.0.0.1:8080/img/logo.png
console.log(logo.src);
//img/logo.png
console.log(logo.getAttribute('src'));

// also true for links, obviously
const link = document.querySelector('.nav__link--btn');

// http://127.0.0.1:8080/#
console.log(link.href);
// #
console.log(link.getAttribute('href'));

// Data attributes
// Has to start with "data-"
// Always stored in the dataset object

// 3.0
console.log(logo.dataset.versionNumber);

// Classes
// .classlist.add(), .classlist.remove(), .classlist.toggle(), .classlist.contains()
// we also can manipulate multiple classes

logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// we can set the class with className
// but we shouldn't do it
// .className will override any existing classes

// logo.className = 'Jonas';

*/

///////////////// COORDINATES /////////////////

/*

 // return object with position properties, relative to visible viewport
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // Current scroll from x and y (left and top)
  console.log(
    'Current scroll position (X/Y): ',
    window.pageXOffset,
    window.pageYOffset,
  );

  console.log(
    'height/width: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth,
  );

  // Scrolling
  // Relative to the current viewport
  window.scrollTo(s1coords.left, s1coords.top);

  // Relative to the top of the page when we adding Offset (current scroll position)
    window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset,
  );

  // We can pass an object instead of coordinates to specify behavior
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

   // More modern way (only works in modern browsers)
  section1.scrollIntoView({behavior: 'smooth'});


  // CLIENT HEIGHT AND WIDTH NOT COUNTING SCROLLBARS, IT'S A DIMENSIONS OF VIEWPORT THAT AVAILABLE TO THE CONTENT

  // window.innerWidth/innerHeight includes the scrollbar
  // In most cases, we need the available window width in order to draw or position 
  // something within scrollbars (if there are any), so we should use documentElement.clientHeight/clientWidth.

  */

///////////////// TYPES OF EVENTS AND EVENT HANDLERS /////////////////
// https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events

/*

const h1 = document.querySelector('h1');

// Listening to events
// eventListener
// onEvent property

// mouseenter fires whenever mouse enter the certain element (similar to hover in CSS)
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListener: Great! You are reading a heading!');
// });

// onEvent property (more oldschool, now addEventListener is more usable)
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading a heading!');
// };

// addEventListener allows to add multiple event listeners to one event (onEvent will add only one that will override previous)

// also we can remove event handler with removeEventListener (we should use a named function as a handler)

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading a heading!');

  // Removing event listener
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// Removing event listener
// h1.removeEventListener('mouseenter', alertH1);

// Removing event after a certain time
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

*/

///////////////// EVENT PROPAGATION: BUBBLING AND CAPTURING /////////////////

// When event happens (most of it, but not all), it travels from documnent element through DOM Node Tree to element that triggered the event
// First phase of it (travelling to the elements) is called Capturing
// Second phase of it, when event executes at target, called Target and it's the execution of event in target
// Third phase of it, when event is travelling back to the document element is called Bubbling
// When Bubbling happens, all parent elements of the target also trigger the event handler (if they have an event listener, ofc)
// (If the event also happened in these elements)
// That's called Event Propagation

// rgb(255,255,255)

/*

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min - 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// Same event on click

// Because of bubbling, when we click on .nav__link, parent container (.nav__links) and it's parent container (.nav) also got a random background color
// Same happens when we click on .nav__links, it's parent container .nav also got a random background color

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // e.target is always the same (it is the element when the event first happened)
  console.log('LINK:', e.target);
  // e.currentTarget is the element to which event handler is attached (.nav__link)
  console.log('LINK:', e.currentTarget);
  // true - e.currentTarget is the same as this keyword (when function is not binded)
  console.log(e.currentTarget === this);

  // Stop propagation (usually it is not a good idea, use very carefully)
  // e.stopPropagation();
  // Stopping the propagation phase (bubbling), so parent elements (.nav__links and .nav) won't change their colors
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // e.target is always the same (it is the element when the event first happened)
  console.log('CONTAINER:', e.target);
  // e.currentTarget is the element to which event handler is attached (.nav__links)
  console.log('CONTAINER:', e.currentTarget);
  // true - e.currentTarget is the same as this keyword (when function is not binded)
  console.log(e.currentTarget === this);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // e.target is always the same (it is the element that triggered the event)
  console.log('NAV:', e.target);
  // e.currentTarget is the element to which event handler is attached (.nav)
  console.log('NAV:', e.currentTarget);
  // true - e.currentTarget is the same as this keyword (when function is not binded)
  console.log(e.currentTarget === this);
});
// For capture the event in parent element during capturing phase, we can use a third parameter of a listener set to true
// Then it will capture the event during Capturing phase, but not during Bubbling
// However, it's rarely used and bubbling is usually more useful

*/

///////////////// EVENT DELEGATION (bubbling in practice) /////////////////

// Method for using event delegation:
// 1. We add event listener to common parent element
// 2. Determine what element originated the event
// 3. Check, if the target has the right class (matching strategy) (to ignore clicks that we don't want to register)

// Not efficient, if we have a lot of elements (not a clean solution)
/*

const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

*/

// Method with event delegation
/*

const navLinksParent = document.querySelector('.nav__links');

navLinksParent.addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const id = link.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

*/

///////////////// DOM TRAVERSING /////////////////

/*

const h1 = document.querySelector('h1');

// Going downwards: child

// use querySelector on element
// that works no matter how deep child elements are
console.log(h1.querySelectorAll('.highlight'));

// childNodes property contains NodeList with ALL child nodes (elements, text, etc)
console.log(h1.childNodes);

// children property contains HTML Collection (live) with direct child html elements
console.log(h1.children);

// firstElementChild is the first child html element
h1.firstElementChild.style.color = 'white';
// lastElementChild is the first child html element
h1.lastElementChild.style.color = 'orangered';

// Going downwards: parents

// similar to childNodes - direct parent node of a selected element
console.log(h1.parentNode);

// similar to children - direct parent element of a selected element
console.log(h1.parentElement);

// Works like querySelectors and returns closest parent element with matching selector
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// (or this element, if it has a matching selector)
h1.closest('h1').style.background = 'var(--gradient-primary)';
// Good for using in event delegations

// Basically closest and query selectors are opposite (selecting elements no matter how deep they are)
// closest - parents
// querySelector, querySelectorAll - children

// Going sideways: selecting siblings
// We can only access direct siblings

// previousElementSibling, nextElementSibling - previous and next html elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// previousSibling, nextSibling - previous and next nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// For selecting all of the siblings (including element itself), we can move to the parent and then select all children
// still HTML collection
console.log(h1.parentElement.children);

// Example for changing style for all siblings except the element itself
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});

*/

///////////////// INTERSECTION OBSERVER API /////////////////
// API

// Observer callback function will be called each time when observed (target) element will intersect the root element at the defined threshold
// root can be null for the entire viewport
// threshold can be an array with multiple values
//callback function will be called with tho arguments: entries and observer
// entries - array of a threshold entries
// observer - observer itself

// Callback function is triggered every time observer element intersect (so leave the view or enter the view) at given threshold
// e.g. on 0 threshold function will be called when element is completely out of viewport or if it enters the viewport even a bit
// on 1 (100%) threshold function will be called when element is fully visible on the viewport (or when even a small part of it isn't visible)
// isIntersecting property indicating when observed element is visible (true - visible, false - not)

// We set options in the options object, root and threshold are basic options, but it also has more
// For instance, rootMargin is a box of n pixels (value of property) that will be applied outside the target element

// Observer will actually observe all of the observed elements in the beginning when the DOM loads

/*

const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};
const obsOptions = { root: null, threshold: [0, 0.2] };

const observer = new IntersectionObserver(obsCallback, obsOptions);

observer.observe(section1);

*/

///////////////// LIFECYCLE DOM EVENTS /////////////////

// DOMContentLoaded - event which fired when html completely parsed (all scripts must be loaded and executed before this event fired)

/*

// We want code to be executed after the DOM is ready
// That's the reason why we put scripts in the end of the body

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

// load event is fired as soon as not only HTML, but external resources (images, css etc.) are loaded too
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// Before Unload event
// Fires right before user is about to leave a page (clicking close button for instance)
// Needs to call preventDefault in some browsers to work
// For historical reasons we need to put returnVAlue to an empty string to display leaving confirmation

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});

*/
