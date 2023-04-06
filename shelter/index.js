import { addBurgerMenuHandler } from "./js/burger.js";
import { modal } from "./js/modal.js";
import { Carousel } from "./js/carousel.js";
import { Pagination } from "./js/pagination.js";


window.onload = function () {
  addBurgerMenuHandler();
  if (location.pathname === '/shelter/pages/main/index.html') {
    addCarouselHandler();
  }
  if (location.pathname === '/shelter/pages/pets/index.html') {
    addPaginationHandler();
  }
}

const addCarouselHandler = () => {
  const carousel = new Carousel();
  carousel.initCarousel();
}

const addPaginationHandler = () => {
  const pagination = new Pagination();
  pagination.initPagination();
}

export const createDomNode = (element, ...classes) => {
  let node = document.createElement(element);
  node.classList.add(...classes);
  return node;
}

export const renderCard = (data) => {
  const card = createDomNode('div', 'pets-item')
  card.setAttribute('id', `${data.id}`);
  card.innerHTML = `<img class="pet-image" src="${data.img}" alt="${data.type}">
  <p class="pet-title">${data.name}</p>
  <button class="button pet-button">Learn more</button>`;
  card.addEventListener('click', () => modal.renderModal(data));
  return card;
}





