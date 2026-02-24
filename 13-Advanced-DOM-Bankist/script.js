'use strict';

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Scroll animation, sticky navigation (section1)
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Menu fade animation
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Smooth scrolling

btnScrollTo.addEventListener('click', function (e) {
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
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset,
  // );

  // More oldschool way
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // More modern way (only works in modern browsers)
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// Not efficient, if we have a lot of elements (not a clean solution)
// const navLinks = document.querySelectorAll('.nav__link');

// navLinks.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Method with event delegation

// 1. We add event listener to common parent element
// 2. Determine what element originated the event
// 3. Check, if the target has the right class (matching strategy)

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

// That will slow down the page if we have a lot of elements (creating a new function for each of them)
// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

tabsContainer.addEventListener('click', function (e) {
  // it won't work correctly, because the button can has another element, and then it will be an actual target (span, for example)
  // const clicked = e.target;

  // closest() come in handy there to select element that we actually interested it
  const clicked = e.target.closest('.operations__tab');

  // Guard clause (return early if condition is matched to finish a function)
  if (!clicked) return;
  // also we can just check for clicked (if (clicked){}) and then wrap all logic in if statement, but return looks nicer and more modern ig

  // Active tab (just modifying classes to hide/show them)
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active'),
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

const handlerHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// That looks meh with anonymous callback function
// nav.addEventListener('mouseover', function (e) {
//   handlerHover(e, 0.5);
// });

// nav.addEventListener('mouseout', function (e) {
//   handlerHover(e, 1);
// });

// Passing "argument" as "this" into handler
// mouseenter do not bubble, while mouseover is
nav.addEventListener('mouseover', handlerHover.bind(0.5));

// opposite for leave
nav.addEventListener('mouseout', handlerHover.bind(1));

///////////////////////////////////////
// Sticky nagivation

// Simple method with scroll event
// fires much times and not efficient, so usually should be avoided

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Using Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Revealing sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  // 4 elements at the beginning, observer will observe all observed elements in the beginning after DOM loading
  // console.log(entries);
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    // we can unobserve the element too
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  // We can observe multiple targets with one observer
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
// Lazy loading images

// const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   // Replace the src attribute with data-src
//   entry.target.src = entry.target.dataset.src;

//   // If we simply remove class that blurs lazy images, it may show us old small image (if internet connection is slow)
//   // When we replace src attribute, JS finds the new image and does it behind the scenes
//   // When the image is loaded, it emits the load event
//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });

//   observer.unobserve(entry.target);
// };

// FIXED VERSION

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Replace the src attribute with data-src
    entry.target.src = entry.target.dataset.src;

    // If we simply remove class that blurs lazy images, it may show us old small image (if internet connection is slow)
    // When we replace src attribute, JS finds the new image and does it behind the scenes
    // When the image is loaded, it emits the load event
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  // Functions
  const createDots = function () {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`,
      );
    });
  };

  const activateDot = function (slide) {
    dotContainer
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    dotContainer
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`),
    );
  };
  // currentSlide = 1: -100%, 0, 100%, 200%...

  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const initSlider = function () {
    goToSlide(0);
    createDots();
    activateDot(currentSlide);
  };

  initSlider();

  // Event handlers
  // buttons
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', previousSlide);

  // arrow keys
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') previousSlide();
    if (e.key === 'ArrowRight') nextSlide();
    activateDot(currentSlide);
  });

  // dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      currentSlide = Number(e.target.dataset.slide);
      goToSlide(currentSlide);
      activateDot(currentSlide);
    }
  });
};

slider();
