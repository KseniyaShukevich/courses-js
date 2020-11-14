import getNewGame, { getAr } from './newGame';
import Graf from './elementGraph';
import getSize from './settings';

let graf = {};

getNewGame();

const btnNewGame = document.querySelector('.btn-new-game');
const moves = document.querySelector('.moves');
let movesCounter = 0;

function setMoves(e) {
  graf.searchAndSwap(e.target.textContent, e.target);
  movesCounter = graf.moves;
  moves.textContent = `Шагов: ${movesCounter}`;
}

function onMouseDown(event) {
  const element = event.target;
  const container = document.querySelector('.container');
  const shiftX = event.clientX - element.getBoundingClientRect().left;
  const shiftY = event.clientY - element.getBoundingClientRect().top;
  const neighbor = graf.getNeighbor(element.textContent);

  element.ondragstart = function () {
    return false;
  };

  element.style.transition = '';
  element.style.zIndex = '1000';

  function moveAt(pageX, pageY) {
    const halfBody = document.body.offsetWidth / 2;
    const halfContainer = container.offsetWidth / 2;
    const leftPosition = pageX - halfBody + halfContainer - shiftX;
    const topPosition = pageY - 100 - shiftY;
    element.style.left = `${(leftPosition / container.offsetWidth) * 100}%`;
    element.style.top = `${(topPosition / container.offsetHeight) * 100}%`;
  }

  moveAt(event.pageX, event.pageY);

  function onMouseMove(ev) {
    moveAt(ev.pageX, ev.pageY);
  }

  function getPosInProc() {
    const result = [];
    const compStyle = getComputedStyle(element);
    let leftPos = compStyle.left;
    let topPos = compStyle.top;
    leftPos = +leftPos.substr(0, leftPos.length - 2);
    topPos = +topPos.substr(0, topPos.length - 2);
    const leftInProc = (leftPos / container.offsetWidth) * 100;
    const topInProc = (topPos / container.offsetHeight) * 100;
    result.push(leftInProc, topInProc);
    return result;
  }

  function getDifAndDist(leftInProc, leftNowInProc, topInProc, topNowInProc) {
    let difference = 0;
    let dist = 0;
    const result = [];

    if (neighbor[0] === 'left' || neighbor[0] === 'right') {
      difference = Math.round(Math.abs(neighbor[1] - leftNowInProc));
      dist = Math.round(Math.abs(leftNowInProc - leftInProc));
    } else if (neighbor[0] === 'top' || neighbor[0] === 'bottom') {
      difference = Math.round(Math.abs(neighbor[1] - topNowInProc));
      dist = Math.round(Math.abs(topNowInProc - topInProc));
    }
    result.push(difference, dist);
    return result;
  }

  function setStyleWhenHasNeighbor(topInProc, leftInProc) {
    if (neighbor[0] === 'left' || neighbor[0] === 'right') {
      element.style.top = `${(topInProc)}%`;
    } else {
      element.style.left = `${(leftInProc)}%`;
    }
    setMoves(event);
  }

  function setStyleNoNeighbor(size) {
    const position = graf.getPosition(element.textContent);
    const leftInProc = ((position - 1) % size) * (100 / size);
    const topInProc = Math.floor(((position - 1) / size)) * (100 / size);
    element.style.left = `${(leftInProc)}%`;
    element.style.top = `${(topInProc)}%`;
  }

  function verify() {
    const size = getSize();
    const styles = getPosInProc();
    const leftNowInProc = styles[0];
    const topNowInProc = styles[1];
    let leftInProc = 0;
    let topInProc = 0;
    if (neighbor.length > 1) {
      const distElement = Math.round(((element.offsetWidth / container.offsetWidth) * 100) / 3);
      leftInProc = ((neighbor[2] - 1) % size) * (100 / size);
      topInProc = Math.floor(((neighbor[2] - 1) / size)) * (100 / size);
      const diffAndDist = getDifAndDist(leftInProc, leftNowInProc, topInProc, topNowInProc);
      const difference = diffAndDist[0];
      const dist = diffAndDist[1];
      if (difference <= distElement || dist <= 2) {
        setStyleWhenHasNeighbor(topInProc, leftInProc);
      } else {
        element.style.left = `${(leftInProc)}%`;
        element.style.top = `${(topInProc)}%`;
      }
    } else {
      setStyleNoNeighbor(size);
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  element.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    element.style.transition = 'all 1s';
    verify();
    setTimeout(() => {
      element.style.zIndex = '';
    }, 1000);
    element.onmouseup = null;
  };
}

function listenElements() {
  const elements = document.querySelectorAll('.element');
  elements.forEach((item) => {
    item.addEventListener('mousedown', onMouseDown);
  });
}

export default function createGraf() {
  const array = getAr();
  graf = new Graf();

  array.forEach((item) => graf.addNext(item));
  graf.createGraphOfElements();
  listenElements();
}

btnNewGame.addEventListener('click', createGraf);
