import { renderCard } from "../index.js";
import { data } from "./data.js";

export class Pagination {
  constructor() {
    this.petsList = document.querySelector('.pets-page .pets-list');
    this.array = [];
    this.media = {
      large: window.matchMedia("(min-width: 1260px)"),
      medium: window.matchMedia("(min-width: 641px) and (max-width: 1259px)"),
      small: window.matchMedia("(max-width: 640px)")
    };
    this.page = 1;
    this.prevBtn = document.querySelector('.prev-button');
    this.nextBtn = document.querySelector('.next-button');
    this.endBtn = document.querySelector('.end-button');
    this.startBtn = document.querySelector('.start-button');
    this.pageNumBtn = document.querySelector('.page-number');
  }

  getItemsCount = () => {
    if (this.media.large.matches) this.itemsCount = 8;
    if (this.media.medium.matches) this.itemsCount = 6;
    if (this.media.small.matches) this.itemsCount = 3;
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

  createArray = () => {
    let tempArr = [];
    while (tempArr.length < 48) {
      tempArr = tempArr.concat(data);
    }
    while (this.array.length < 48) {
      this.array = this.array.concat(this.shuffleArray(tempArr.splice(0, 4)));
    }
  }

  createSlice = () => {
    this.sliceStart = this.page * this.itemsCount - this.itemsCount;
    return this.array.slice(this.sliceStart, this.page * this.itemsCount);
  }

  renderCards = () => {
    this.petsList.replaceChildren();
    this.createSlice().forEach(data => this.petsList.append(renderCard(data)));
  }

  getPageNumber = () => {
    this.page = Math.ceil((this.sliceStart + 1) / this.itemsCount);
    this.renderPageNumber();
  }

  renderPageNumber = () => {
    this.pageNumBtn.innerHTML = `${this.page}`;
    this.toggleBtnsDisable();
  }

  toggleBtnsDisable = () => {
    if (this.page === 1) {
      this.prevBtn.classList.add('disabled');
      this.startBtn.classList.add('disabled');
    };
    if (this.page > 1) {
      this.prevBtn.classList.remove('disabled');
      this.startBtn.classList.remove('disabled');
    };
    if (this.page === this.array.length / this.itemsCount) {
      this.nextBtn.classList.add('disabled');
      this.endBtn.classList.add('disabled');
    };
    if (this.page !== this.array.length / this.itemsCount) {
      this.nextBtn.classList.remove('disabled');
      this.endBtn.classList.remove('disabled');
    };
  }

  initPagination = () => {
    this.createArray();
    this.getItemsCount();
    this.renderPageNumber();
    this.renderCards();

    for (let size in this.media) {
      this.media[size].addEventListener('change', (e) => {
        if (e.matches) {
          this.getItemsCount();
          this.getPageNumber();
          this.renderCards();
        }
      });
    }

    this.nextBtn.addEventListener('click', () => {
      this.page++;
      this.renderPageNumber();
      this.renderCards();
    });

    this.prevBtn.addEventListener('click', () => {
      this.page--;
      this.renderPageNumber();
      this.renderCards();

    });

    this.endBtn.addEventListener('click', () => {
      this.page = this.array.length / this.itemsCount;
      this.renderPageNumber();
      this.renderCards();

    });

    this.startBtn.addEventListener('click', () => {
      this.page = 1;
      this.renderPageNumber();
      this.renderCards();
    });
  }

}