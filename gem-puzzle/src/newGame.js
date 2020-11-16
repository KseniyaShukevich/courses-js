import getSize from './settings';
import getHtmlElement from './elementHtml';
import isSolvability from './solvabilityСheck';
import changeTime, { setCounterTime } from './time';
import { hideMenu } from './statusMenu';
import inputImage from './images';
import addEventsSound from './sound';

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

function fillArray(allElements) {
  for (let i = 0; i < allElements; i += 1) {
    const number = getRandomNumber(allElements);
    if (arr.indexOf(number) === -1) {
      arr.push(number);
    } else {
      i -= 1;
    }
  }
}

function getSaveGame() {
  const buff = localStorage.getItem('arraySaveGame').split(',');
  arr = buff.slice(0, buff.length - 2);
  arr = arr.map((el) => +el);
  const saveTime = +localStorage.getItem('saveTimeCounter');
  const [minutes, seconds] = setCounterTime(saveTime);
  time.textContent = `Время: ${minutes}:${seconds}`;
  moves.textContent = `Шагов: ${buff[buff.length - 1]}`;
  return saveTime;
}

function getArray() {
  const arraySaveGame = localStorage.getItem('arraySaveGame');
  if (arraySaveGame === 'null' || !arraySaveGame) {
    const size = getSize();
    const allElements = size * size;
    fillArray(allElements);
    if (!isSolvability(arr, size)) {
      arr = [];
      getArray();
    }
  } else {
    const saveTime = getSaveGame();
    changeTime(isNewGame, saveTime);
    isNewGame = true;
    setStatusGame();
    hideMenu();
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
  inputImage();
}

function deleteNodes() {
  const elements = document.querySelectorAll('.element');
  if (elements.length > 0) {
    elements.forEach((item) => {
      item.remove();
    });
  }
}

export default function getNewGame() {
  arr = [];
  deleteNodes();
  getArray();
  createElements();
}

export function getAr() {
  return arr;
}

function startGame() {
  time.textContent = 'Время: 00:00';
  moves.textContent = 'Шагов: 0';
  localStorage.setItem('arraySaveGame', 'null');
  changeTime(isNewGame, 0);
  isNewGame = true;
  setStatusGame();
  getNewGame();
  hideMenu();
  addEventsSound();
}

btnNewGame.addEventListener('click', startGame);
