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
let randomNums = [];
const getRandomNum = () => {
  return Math.floor(Math.random() * data.length);
}
while (randomNums.length < 3) {
  let randomNum = getRandomNum();
  if (randomNums.includes(randomNum)) continue;
  randomNums.push(randomNum)
}

let leftSlide = document.createElement('li');
leftSlide.className = 'pets-item';
leftSlide.innerHTML = `<img class="pets-image" src="${data[randomNums[0]].img}" alt="${data[randomNums[0]].type}">
            <p class="pet-title">${data[randomNums[0]].name}</p>
            <button class="button pet-button">Learn more</button>`;
petsList.append(leftSlide);
let activeSlide = document.createElement('li');
activeSlide.className = 'pets-item';
activeSlide.innerHTML = `<img class="pets-image" src="${data[randomNums[1]].img}" alt="${data[randomNums[1]].type}">
            <p class="pet-title">${data[randomNums[1]].name}</p>
            <button class="button pet-button">Learn more</button>`;
petsList.append(activeSlide);
let rightSlide = document.createElement('li');
rightSlide.className = 'pets-item';
rightSlide.innerHTML = `<img class="pets-image" src="${data[randomNums[2]].img}" alt="${data[randomNums[2]].type}">
            <p class="pet-title">${data[randomNums[2]].name}</p>
            <button class="button pet-button">Learn more</button>`;
petsList.append(rightSlide);


// Carousel

const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const img = new Image();
prevButton.addEventListener('click', () => {
  petsList.classList.add('animation-left');
  prevButton.classList.add('disabled');
  setTimeout(() => {
    rightSlide.innerHTML = activeSlide.innerHTML;
    randomNums[2] = randomNums[1];
    activeSlide.innerHTML = leftSlide.innerHTML;
    randomNums[1] = randomNums[0];
    while (true) {
      let randomNum = getRandomNum();
      if (!randomNums.includes(randomNum)) {
        randomNums[0] = randomNum;
        break;
      }
      else continue;
    }
    img.src = data[randomNums[0]].img;
    img.onload = () => {
      leftSlide.innerHTML = `<img class="pets-image" src="${img.src}" alt="${data[randomNums[0]].type}">
        <p class="pet-title">${data[randomNums[0]].name}</p>
        <button class="button pet-button">Learn more</button>`;
    }
    petsList.style.left = 0;
    petsList.classList.remove('animation-left');
    prevButton.classList.remove('disabled');
  }, 1000);

})

nextButton.addEventListener('click', () => {
  petsList.classList.add('animation-right');
  nextButton.classList.add('disabled');
  setTimeout(() => {
    leftSlide.innerHTML = activeSlide.innerHTML;
    randomNums[0] = randomNums[1];
    activeSlide.innerHTML = rightSlide.innerHTML;
    randomNums[1] = randomNums[2];
    while (true) {
      let randomNum = getRandomNum();
      if (!randomNums.includes(randomNum)) {
        randomNums[2] = randomNum;
        break;
      }
      else continue;
    }
    img.src = data[randomNums[2]].img;
    img.onload = () => {
      rightSlide.innerHTML = `<img class="pets-image" src="${img.src}" alt="${data[randomNums[2]].type}">
        <p class="pet-title">${data[randomNums[2]].name}</p>
        <button class="button pet-button">Learn more</button>`;
    };
    petsList.style.left = 0;
    petsList.classList.remove('animation-right');
    nextButton.classList.remove('disabled');
  }, 1000);
})


