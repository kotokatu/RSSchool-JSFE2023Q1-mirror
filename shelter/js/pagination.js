import { renderCard } from "../index.js";
import { data } from "./data.js";

export class Pagination {
  constructor() {
    this.petsList = document.querySelector('.pets-page .pets-list');
    this.array = [];
    this.large = window.matchMedia("(min-width: 1260px)")
    this.medium = window.matchMedia("(min-width: 641px) and (max-width: 1259px)");
    this.small = window.matchMedia("(min-width: 1px) and (max-width: 640px)");
    this.itemsCount;
    this.page = 1;
    this.sliceStart = 0;
    this.prevBtn = document.querySelector('.prev-button');
    this.nextBtn = document.querySelector('.next-button');
    this.endBtn = document.querySelector('.end-button');
    this.startBtn = document.querySelector('.start-button');
    this.pageNumBtn = document.querySelector('.page-number');
  }

  handleLargeScreen = e => {
    if (e.matches) {
      this.itemsCount = 8;
      return true;
    }
  }

  handleMediumScreen = e => {
    if (e.matches) {
      this.itemsCount = 6;
      return true;
    }
  }

  handleSmallScreen = e => {
    if (e.matches) {
      this.itemsCount = 3;
      return true;
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

  createArray = () => {
    this.data = this.shuffleArray(data);
    let tempArr = [];
    while (tempArr.length < 48) {
      tempArr = tempArr.concat(this.data);
    }
    while (this.array.length < 48) {
      this.array = this.array.concat(this.shuffleArray(tempArr.splice(0, 4)));
    }
  }

  createSlice = () => {
    let slice = this.array.slice(this.sliceStart, this.sliceStart + this.itemsCount);
    return slice;
  }

  renderCards = () => {
    this.petsList.replaceChildren();
    this.createSlice().forEach(data => this.petsList.append(renderCard(data)));
  }

  getPageNumber = () => {
    this.page = Math.ceil((this.sliceStart + 1) / this.itemsCount);
    this.sliceStart = this.page * this.itemsCount - this.itemsCount;
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
    this.handleSmallScreen(this.small);
    this.handleMediumScreen(this.medium);
    this.handleLargeScreen(this.large);
    this.createArray();
    this.renderPageNumber();
    this.renderCards();

    this.large.addEventListener('change', (e) => {
      if (this.handleLargeScreen(e)) {
        this.getPageNumber();
        this.renderCards();
      }
    });

    this.medium.addEventListener('change', (e) => {
      if (this.handleMediumScreen(e)) {
        this.getPageNumber();
        this.renderCards();
      }
    });

    this.small.addEventListener('change', (e) => {
      if (this.handleSmallScreen(e)) {
        this.getPageNumber();
        this.renderCards();
      }
    });

    this.nextBtn.addEventListener('click', () => {
      this.sliceStart = this.sliceStart + this.itemsCount;
      this.page++;
      this.renderPageNumber();
      this.renderCards();
    });

    this.prevBtn.addEventListener('click', () => {
      this.sliceStart = this.sliceStart - this.itemsCount;
      this.page--;
      this.renderPageNumber();
      this.renderCards();

    });

    this.endBtn.addEventListener('click', () => {
      this.sliceStart = this.array.length - this.itemsCount;
      this.page = this.array.length / this.itemsCount;
      this.renderPageNumber();
      this.renderCards();

    });

    this.startBtn.addEventListener('click', () => {
      this.sliceStart = 0;
      this.page = 1;
      this.renderPageNumber();
      this.renderCards();
    });
  }

}