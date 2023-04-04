import { pets as data} from "../../assets/pets.js";

window.onload = function () {
  addBurgerMenuHandler();
}

/*****************************************************************************/

// Burger menu

const addBurgerMenuHandler = () => {
  const burgerButton = document.querySelector('.burger');
  const navigationMenu = document.querySelector('.navigation-list');
  document.addEventListener('click', function (evt) {
    if (burgerButton.contains(evt.target) && !navigationMenu.classList.contains('visible')) {
      openMenu(burgerButton, navigationMenu);
    } else if (evt.target.className == 'navigation-link' || !navigationMenu.contains(evt.target)) {
      closeMenu(burgerButton, navigationMenu);
    }
  })
}

const openMenu = (burgerButton, navigationMenu) => {
  burgerButton.classList.add('active');
  navigationMenu.classList.add('visible');
}

const closeMenu = (burgerButton, navigationMenu) => {
  burgerButton.classList.remove('active');
  navigationMenu.classList.remove('visible');
}

export { addBurgerMenuHandler }

// Carousel layout

const petsList = document.querySelector('.pets-list');
const slides = { active: [], left: [], right: [] };
const large = window.matchMedia("(min-width: 1201px)")
const medium = window.matchMedia("(min-width: 768px) and (max-width: 1200px)");
const small = window.matchMedia("(min-width: 1px) and (max-width: 767px)");
let itemsCount;

const handleLargeScreen = (e) => {
  if (e.matches) itemsCount = 3;
}

const handleMediumScreen = (e) => {
  if (e.matches) itemsCount = 2;
}

const handleSmallScreen = (e) => {
  if (e.matches) itemsCount = 1;
}

handleLargeScreen(large);
handleMediumScreen(medium);
handleSmallScreen(small);

const getRandomNum = () => {
  return Math.floor(Math.random() * data.length);
}

const addSlide = (position) => {
  slides[position] = [];
  while (slides[position].length < itemsCount) {
    let randomNum = getRandomNum();
    if (slides[position].includes(data[randomNum]) || slides.active.includes(data[randomNum])) continue;
    slides[position].push(data[randomNum]);
  }
}

const addSlides = () => {
  for (let position in slides) {
    addSlide(position);
  }
}

addSlides();

const renderSlide = (position) => {
  let slide = document.createElement('div');
  slide.className = `slide ${position}-slide`;
  slide.innerHTML = '';
  slides[position].forEach(el => {
    slide.innerHTML += `<div class="pets-item"><img class="pets-image" src="${el.img}" alt="${el.type}">
    <p class="pet-title">${el.name}</p>
    <button class="button pet-button">Learn more</button></div>`
  });
  return slide;
}

const renderSlides = () => {
  petsList.replaceChildren();
  petsList.append(renderSlide("left"), renderSlide("active"), renderSlide("right"));
}

renderSlides();

large.addEventListener('change', (e) => {
  handleLargeScreen(e);
  addSlides();
  renderSlides();
});
medium.addEventListener('change', (e) => {
  handleMediumScreen(e);
  addSlides();
  renderSlides();
});
small.addEventListener('change', (e) => {
  handleSmallScreen(e);
  addSlides();
  renderSlides();
});

// Carousel Behaviour

const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
prevButton.addEventListener('click', () => {
  prevButton.classList.add('disabled');
  petsList.classList.add('animation-left');
  setTimeout(() => {
    slides.right = slides.active;
    slides.active = slides.left;
    addSlide("left");
    renderSlides();
    petsList.classList.remove('animation-left');
    prevButton.classList.remove('disabled');
  }, 1000);

})

nextButton.addEventListener('click', () => {
  nextButton.classList.add('disabled');
  petsList.classList.add('animation-right');
  setTimeout(() => {
    slides.left = slides.active;
    slides.active = slides.right;
    addSlide("right");
    renderSlides();
    petsList.classList.remove('animation-right');
    nextButton.classList.remove('disabled');
  }, 1000);
})


