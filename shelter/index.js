import { addBurgerMenuHandler } from "./js/burger.js";
import { modal } from "./js/modal.js";
import { Carousel } from "./js/carousel.js";
import { Pagination } from "./js/pagination.js";
import { data } from "./js/data.js";


window.onload = function () {
  preload();
  addBurgerMenuHandler();
  if (document.querySelector('.main-page')) {
    addCarouselHandler();
  }
  if (document.querySelector('.pets-page')) {
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
  card.innerHTML = `<img class="pet-image" src="${data.img}" alt="${data.type}" width="270px" height="270px">
  <p class="pet-title">${data.name}</p>
  <button class="button pet-button">Learn more</button>`;
  card.addEventListener('click', () => modal.renderModal(data));
  return card;
}

const preload = () => {
  data.forEach(item => {
    const img = new Image();
    img.src = item.img;
  })
  data.forEach(item => {
    const img = new Image();
    img.src = item.imgHi;
  })
}





