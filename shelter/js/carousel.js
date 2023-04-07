import { renderCard } from "../index.js";
import { data } from "./data.js";

export class Carousel {
  constructor() {
    this.petsList = document.querySelector('.main-page .pets-list');
    this.slides = { active: [], left: [], right: [] };
    this.large = window.matchMedia("(min-width: 1201px)")
    this.medium = window.matchMedia("(min-width: 768px) and (max-width: 1200px)");
    this.small = window.matchMedia("(min-width: 1px) and (max-width: 767px)");
    this.itemsCount;
    this.prevButton = document.querySelector('.prev-button');
    this.nextButton = document.querySelector('.next-button');
  }

  handleLargeScreen = (e) => {
    if (e.matches) {
      this.itemsCount = 3;
      return true;
    }
  }

  handleMediumScreen = (e) => {
    if (e.matches) {
      this.itemsCount = 2;
      return true;
    }
  }

  handleSmallScreen = (e) => {
    if (e.matches) {
      this.itemsCount = 1;
      return true;
    }
  }

  getRandomNum = () => {
    return Math.floor(Math.random() * data.length);
  }

  addSlide = (position) => {
    this.slides[position] = [];
    while (this.slides[position].length < this.itemsCount) {
      let randomNum = this.getRandomNum();
      if (this.slides[position].includes(data[randomNum]) || this.slides.active.includes(data[randomNum])) continue;
      this.slides[position].push(data[randomNum]);
    }
  }

  addSlides = () => {
    for (let position in this.slides) {
      this.addSlide(position);
    }
  }

  renderSlide = (position) => {
    let slide = document.createElement('div');
    slide.className = `slide ${position}-slide`;
    this.slides[position].forEach(el => {
      slide.append(renderCard(el));
    });
    return slide;
  }

  renderSlides = () => {
    this.petsList.replaceChildren();
    this.petsList.append(this.renderSlide("left"), this.renderSlide("active"), this.renderSlide("right"));
  }

  initCarousel = () => {
    this.handleSmallScreen(this.small);
    this.handleMediumScreen(this.medium);
    this.handleLargeScreen(this.large);
    this.addSlides();
    this.renderSlides();

    this.large.addEventListener('change', (e) => {
      if (this.handleLargeScreen(e)) {
        this.addSlides();
        this.renderSlides();
      }
    });

    this.medium.addEventListener('change', (e) => {
      if (this.handleMediumScreen(e)) {
        this.addSlides();
        this.renderSlides();
      }
    });

    this.small.addEventListener('change', (e) => {
      if (this.handleSmallScreen(e)) {
        this.addSlides();
        this.renderSlides();
      }
    });

    this.prevButton.addEventListener('click', () => {
      this.prevButton.classList.add('disabled');
      this.petsList.classList.add('animation-left');
      setTimeout(() => {
        this.slides.right = this.slides.active;
        this.slides.active = this.slides.left;
        this.addSlide("left");
        this.renderSlides();
        this.petsList.classList.remove('animation-left');
        this.prevButton.classList.remove('disabled');
      }, 1000);
    })

    this.nextButton.addEventListener('click', () => {
      this.nextButton.classList.add('disabled');
      this.petsList.classList.add('animation-right');
      setTimeout(() => {
        this.slides.left = this.slides.active;
        this.slides.active = this.slides.right;
        this.addSlide("right");
        this.renderSlides();
        this.petsList.classList.remove('animation-right');
        this.nextButton.classList.remove('disabled');
      }, 1000);
    })
  }

}


