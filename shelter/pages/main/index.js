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

// Add pets
const petsList = document.querySelector('.pets-list');
const pets = `../../assets/pets.json`;
const res = await fetch(pets);
const data = await res.json();
const getRandomNum = () => {
  return Math.floor(Math.random() * data.length);
}
let slides = { active: [], left: [], right: [] };
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

const createSlidesData = () => {
  for (let position in slides) {
    createSlide(position);
  }
}

const createSlide = (position) => {
  slides[position] = [];
  while (slides[position].length < itemsCount) {
    let randomNum = getRandomNum();
    console.log(data[randomNum])
    if (slides[position].includes(data[randomNum]) || slides.active.includes(data[randomNum])) continue;
    slides[position].push(data[randomNum]);
  }
}

createSlidesData();

let leftSlide, activeSlide, rightSlide;
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
  leftSlide = renderSlide("left");
  activeSlide = renderSlide("active");
  rightSlide = renderSlide("right");
  petsList.append(leftSlide, activeSlide, rightSlide);
  console.log(slides)
}

renderSlides();


large.addEventListener('change', (e) => {
  handleLargeScreen(e);
  createSlidesData();
  renderSlides();
});
medium.addEventListener('change', (e) => {
  handleMediumScreen(e);
  createSlidesData();
  renderSlides();
});
small.addEventListener('change', (e) => {
  handleSmallScreen(e);
  createSlidesData();
  renderSlides();
});

// Carousel

const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
prevButton.addEventListener('click', () => {
  petsList.classList.add('animation-left');
  prevButton.classList.add('disabled');
  setTimeout(() => {
    slides.right = slides.active;
    slides.active = slides.left;
    createSlide("left");
    renderSlides();
    petsList.classList.remove('animation-left');
    prevButton.classList.remove('disabled');
  }, 1000);

})

nextButton.addEventListener('click', () => {
  petsList.classList.add('animation-right');
  nextButton.classList.add('disabled');
  setTimeout(() => {
    slides.left = slides.active;
    slides.active = slides.right;
    createSlide("right");
    renderSlides();
    petsList.classList.remove('animation-right');
    nextButton.classList.remove('disabled');
  }, 1000);
})


