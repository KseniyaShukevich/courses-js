import getSize from './settings';
import getHtmlElement from './elementHtml';
import isSolvability from './solvabilityСheck';
import changeTime from './time';

const btnNewGame = document.querySelector('.btn-new-game');
const moves = document.querySelector('.moves');
const time = document.querySelector('.time');

let arr = [];
let isNewGame = false;

function getRandomNumber(max) {
  const rand = Math.random() * max;
  return Math.floor(rand);
}

function inputStatusGame() {
  localStorage.setItem('isGameStart', '0');
}

inputStatusGame();

function setStatusGame() {
  if (localStorage.getItem('isGameStart') === '0') {
    localStorage.setItem('isGameStart', '1');
  }
}

function getArray() {
  const size = getSize();
  const allElements = size * size;
  for (let i = 0; i < allElements; i += 1) {
    const number = getRandomNumber(allElements);
    if (arr.indexOf(number) === -1) {
      arr.push(number);
    } else {
      i -= 1;
    }
  }
  if (!isSolvability(arr, size)) {
    arr = [];
    getArray();
  }
}

function createElements() {
  const mainDiv = document.querySelector('.container');
  const size = getSize();
  for (let i = 0; i < arr.length; i += 1) {
    const el = getHtmlElement(arr[i], size, i);
    if (el) {
      mainDiv.append(el);
    }
  }
}

function deleteNodes() {
  const elements = document.querySelectorAll('.element');
  if (elements.length > 0) {
    elements.forEach((item) => {
      item.remove();
    });
  }
}

function hideMenu() {
  const containerMenu = document.querySelector('.container-menu');
  const btnPause = document.querySelector('.btn-pause');
  containerMenu.style.display = 'none';
  btnPause.textContent = 'Пауза';
}

export default function getNewGame() {
  time.textContent = 'Время: 00:00';
  moves.textContent = 'Шагов: 0';
  arr = [];
  deleteNodes();
  getArray();
  createElements();
}

export function getAr() {
  return arr;
}

function startGame() {
  changeTime(isNewGame);
  isNewGame = true;
  setStatusGame();
  getNewGame();
  hideMenu();
}

btnNewGame.addEventListener('click', startGame);
