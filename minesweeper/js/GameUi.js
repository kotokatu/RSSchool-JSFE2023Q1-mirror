export class GameUI {
  constructor() {
    this.open = new Audio('../assets/sounds/open.wav');
    this.flag = new Audio('../assets/sounds/flag.wav');
    this.unflag = new Audio('../assets/sounds/unflag.wav');
    this.lose = new Audio('../assets/sounds/lose.wav');
    this.win = new Audio('../assets/sounds/win.wav');
    this.gameContainer = this.createNode('div', 'game-container');
    this.gameHeader = this.createNode('div', 'game-header');
    this.gameField = this.createNode('div', '');
    this.gameFooter = this.createNode('div', 'game-footer');
    this.timeDisplay = this.createNode('span', 'time-display');
    this.clicksDisplay = this.createNode('span', 'clicks-display');
    this.newGameButton = this.createNode('button', 'new-game-btn', 'New Game');
    this.stats = this.createNode('div', 'stats');
    this.minesLeft = this.createNode('span', 'mines-left');
    this.flagsLeft = this.createNode('span', 'flags-left');
    this.select = this.createNode('select', 'level-select',
                                  `<option value="easy">easy</option>
                                  <option value="medium">medium</option>
                                  <option value="hard">hard</option>`);
    this.minesInput = this.createNode('input', 'mines-input');
    this.minesInput.setAttribute('type', 'number');
    this.minesInput.setAttribute('min', '10');
    this.minesInput.setAttribute('max', '99');
    this.soundBtn = this.createNode('button', 'sound-btn');
    this.themeBtn = this.createNode('button', 'theme-btn');
    this.scoreBtn = this.createNode('button', 'score-btn', 'SCORE');
    document.body.prepend(this.gameContainer);
    this.gameHeader.append(this.timeDisplay, this.newGameButton, this.clicksDisplay, this.stats);
    this.stats.append(this.minesLeft, this.flagsLeft);
    this.gameContainer.append(this.gameHeader, this.gameField, this.gameFooter);
    this.gameFooter.append(this.select, this.minesInput, this.scoreBtn, this.soundBtn, this.themeBtn);
  }

  createNode = (tag, className, content = null) => {
    const node = document.createElement(`${tag}`);
    node.className = className;
    node.innerHTML = content;
    return node;
  }

  renderField = (array) => {
    this.gameField.replaceChildren();
    const size = array.length;
    this.gameField.className = `field size-${size}`;
    array.forEach(rowArr => {
      this.gameField.append(this.createRow(rowArr));
    });
    this.scoreBtn.classList.remove('active');
  }

  createRow = (rowArr) => {
    const row = this.createNode('div', 'row');
    const size = rowArr.length;
    rowArr.forEach(cell => {
      row.append(this.createCell(cell, size))
    });
    return row;
  }

  createCell = (cell, size) => {
    const cellElem = this.createNode('span', `cell size-${size}`);
    cellElem.id = cell.id;
    return cellElem;
  }

  createOverlay = (cls) => {
    const overlay = this.createNode('div', `overlay ${cls}`);
    this.gameField.append(overlay);
    return overlay;
  }

  displayMessage = (msg) => {
    const overlay = this.createOverlay('overlay-message');
    overlay.innerHTML = `<p class="message">${msg}</p>`;
  }

  displayTime = (seconds) => {
    this.timeDisplay.innerText = `${seconds}`.padStart(3, '0');
  }

  displayClicks = (clicks) => {
    this.clicksDisplay.innerText = `${clicks}`.padStart(3, '0');
  }

  displayFlagged = (cell) => {
    if (!cell.isOpen) this.gameField.querySelector(`#${cell.id}`).innerText = cell.isFlagged ? '🚩' : '';
  }

  displayFlagCount = (flagCount) => {
    this.flagsLeft.innerText = `${flagCount}`.padStart(2, '0');
  }

  displayMineCount = (mineCount) => {
    this.minesLeft.innerText = `${mineCount}`.padStart(2, '0');
  }

  displayOpen = (cell, isClicked) => {
    const cellElem = this.gameField.querySelector(`#${cell.id}`);
    if (cell.isOpen) {
      cell.isMine ? cellElem.classList.add('open', 'mine') : cellElem.classList.add('open', `cc-${cell.value}`) ;
      cellElem.innerHTML = cell.value ? cell.value : '';
    }
    if (cell.isMine && isClicked) cellElem.classList.add('exploded');
  }

  highlightWrongFlags = (cell) => {
    const cellElem = this.gameField.querySelector(`#${cell.id}`);
    cellElem.classList.add('wrong-flag');
  }

  displayLevel = (level) => {
    this.select.value = level;
  }

  setMinesInputValue = (value) => {
    this.minesInput.value = value;
  }

  toggleMinesInputDisable = (isPlaying) => {
    this.minesInput.disabled = isPlaying ? true : false;
  }

  playSound = (action) => {
    this[action].play();
  }

  toggleSound = (soundOn) => {
    soundOn ? this.soundBtn.classList.remove('off') : this.soundBtn.classList.add('off');
  }

  toggleTheme = (themeLight) => {
    themeLight ? document.body.classList.add('light') : document.body.classList.remove('light');
  }

  toggleScoreDisplay = (scoreArr) => {
    const overlay = document.querySelector('.overlay-score') || this.createOverlay('overlay-score');
    if (document.querySelector('.score-table')) {
      this.scoreBtn.classList.remove('active');
      overlay.remove();
      return;
    }
    this.scoreBtn.classList.add('active');
    const scoreTable = this.createNode('table', 'score-table',
      `<table><tr><th class="score-cell">level</th><th class="score-cell">mines</th><th class="score-cell">moves</th><th class="score-cell">time</th></tr></table>`);
    overlay.append(scoreTable);
    if (scoreArr) scoreArr.forEach(row => {
      const rowElem = this.createNode('tr', 'score-row');
      scoreTable.append(rowElem);
      row.forEach(cellData => {
        const cellElem = this.createNode('td', 'score-cell', cellData);
        rowElem.append(cellElem);
      })
    });
  }
}
