import getSize from './settings';
import getHtmlElement from './elementHtml';

const btnNewGame = document.querySelector('.btn-new-game');
let arr = [];

function getRandomNumber(max) {
  const rand = Math.random() * max;
  return Math.floor(rand);
}

function getArray() {
  const allElements = getSize() * getSize();

  for (let i = 0; i < allElements; i += 1) {
    const number = getRandomNumber(allElements);
    if (arr.indexOf(number) === -1) {
      arr.push(number);
    } else {
      i -= 1;
    }
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
  containerMenu.style.display = 'none';
}

export default function getNewGame() {
  arr = [];
  deleteNodes();
  getArray();
  createElements();
}

btnNewGame.addEventListener('click', () => { getNewGame(); hideMenu(); });
