import { renderCard } from "../index.js";
import { data } from "./data.js";

export class Pagination {
  constructor() {
    this.petsList = document.querySelector('.pets-page .pets-list');
    this.array = [];
    this.large = window.matchMedia("(min-width: 1260px)")
    this.medium = window.matchMedia("(min-width: 641px) and (max-width: 1259px)");
    this.small = window.matchMedia("(max-width: 640px)");
    this.itemsCount;
    this.page = 1;
  }

  createArray = () => {
    this.data = this.shuffleArray(data);
    let tempArr = [];
    while (tempArr.length < 48) {
      tempArr = tempArr.concat(this.data);
    }
    while (this.array.length < 48) {
      this.array = this.array.concat(this.sliceArray(tempArr));
    }
  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  sliceArray = array => {
    let slice = array.splice(0, 4);
    return this.shuffleArray(slice);
  }

  renderCards = () => {
    this.petsList.replaceChildren();
    this.handleLargeScreen(this.large);
    this.handleMediumScreen(this.medium);
    this.handleSmallScreen(this.small);
    let slice = this.array.slice(this.itemsCount * this.page - this.itemsCount, this.itemsCount * this.page);
    slice.forEach(data => this.petsList.append(renderCard(data)));
  }

  handleLargeScreen = (e) => {
    if (e.matches) this.itemsCount = 8;
  }

  handleMediumScreen = (e) => {
    if (e.matches) this.itemsCount = 6;
  }

  handleSmallScreen = (e) => {
    if (e.matches) this.itemsCount = 3;
  }

  initPagination = () => {
    this.createArray();
    this.updatePageNumber();
    this.renderCards();
    this.large.addEventListener('change', () => {
      this.renderCards()
    });

    this.medium.addEventListener('change', () => {
      this.renderCards()
    });

    this.small.addEventListener('change', () => {
      this.renderCards()
    });

    document.querySelector('.next-button').addEventListener('click', () => {
      this.page++;
      this.updatePageNumber();
      this.renderCards();
    });

    document.querySelector('.prev-button').addEventListener('click', () => {
      this.page--;
      this.updatePageNumber();
      this.renderCards();
    });
  }

  updatePageNumber = () => {
    document.querySelector('.page-number').innerHTML = `${this.page}`;
  }

  // incrementPageNumber = () => {
  //   this.page
  // }

}