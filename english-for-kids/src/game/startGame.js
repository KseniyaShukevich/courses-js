import getButtonStartGame, { changeButtonStartGame, getButtonRepeat } from './changeStyles';
import { getArrayCategories } from '../pages/createObjectCategory';
import getObjGame from './classGame';
import getMain from '../pages/mainPage';
import { addCorrClick, addErrClicks } from '../statistics/localStorage';
import getDifficultCategory, { clearCategory } from './difficultWords';

const buttonGame = document.querySelector('.button-start-game');
const menuLinks = document.querySelectorAll('.menu-link');
const buttonStatus = document.querySelector('.button-header');
const arrayCategories = getArrayCategories();
const game = getObjGame();
let arrayWords = [];
let correctWordCount = 0;
let errors = 0;

function getCategoryObject() {
  const cards = document.querySelectorAll('.card-word');
  const categoryAttribute = cards[0].getAttribute('data-category');
  const category = arrayCategories.find((el) => el.name === categoryAttribute);
  return category;
}

function getRandomIndex() {
  const cards = document.querySelectorAll('.card-word');
  const rand = Math.random() * cards.length;
  return Math.floor(rand);
}

function getArrayWords(category) {
  const cards = document.querySelectorAll('.card-word');
  const arrayIndex = [];
  for (let i = 0; i < cards.length; i += 1) {
    const index = getRandomIndex();
    if (arrayIndex.includes(index)) {
      i -= 1;
    } else {
      arrayIndex.push(index);
      arrayWords.push(category.words[index]);
    }
  }
}

function getAudioWord() {
  setTimeout(() => arrayWords[correctWordCount].getAudio(), 700);
}

function getLayer(e) {
  const layer = e.currentTarget.querySelector('.layer');
  layer.classList.add('displayBlock');
}

function removeLayers() {
  const layers = document.querySelectorAll('.layer');
  layers.forEach((el) => {
    if (el.classList.contains('displayBlock')) {
      el.classList.remove('displayBlock');
    }
  });
}

function removeStars() {
  const stars = document.querySelectorAll('.star');
  if (stars) {
    stars.forEach((el) => el.remove());
  }
}

function clearGame() {
  arrayWords = [];
  correctWordCount = 0;
  errors = 0;
  removeLayers();
  removeStars();
}

function removeElements() {
  const endOfGame = document.querySelector('.end-of-game');
  const image = document.querySelector('.image-end-game');
  const text = document.querySelector('.text-end-game');
  setTimeout(() => {
    image.remove();
    if (text) {
      text.remove();
    }
    endOfGame.classList.remove('displayFlex');
    document.body.classList.remove('overflow', 'posRelative');
  }, 3000);
}

function getEndGame() {
  const endOfGame = document.querySelector('.end-of-game');
  const containerEndGame = document.querySelector('.container-end-game');
  const links = document.querySelectorAll('.menu-link');
  const link = Array.from(links).find((el) => el.getAttribute('data-link') === 'Main page');
  endOfGame.classList.add('displayFlex');
  document.body.classList.add('overflow', 'posRelative');
  if (errors === 0) {
    containerEndGame.append(game.getImageSuccess());
    game.getAudioSuccess();
  } else {
    containerEndGame.append(game.getTextFailure(errors));
    containerEndGame.append(game.getImageFailure());
    game.getAudioFail();
  }
  removeElements();
  getMain(link.getAttribute('data-link'));
}

function isEndGame() {
  if (correctWordCount === arrayWords.length) {
    getEndGame();
    clearGame();
    clearCategory();
    return true;
  }
  return false;
}

function checkCard(e) {
  const word = e.currentTarget.getAttribute('data-word');
  const containerStars = document.querySelector('.container-stars');
  if (arrayWords[correctWordCount].word === word) {
    addCorrClick(word);
    game.getAudioCorr();
    containerStars.append(game.getImgCorrStar());
    getLayer(e);
    correctWordCount += 1;
    if (correctWordCount < arrayWords.length) {
      getAudioWord();
    }
  } else {
    addErrClicks(word);
    game.getAudioError();
    containerStars.append(game.getImgErrStar());
    errors += 1;
  }
}

function check(e) {
  const layer = e.currentTarget.querySelector('.layer');
  if (e.target !== layer) {
    checkCard(e);
    if (isEndGame()) {
      getButtonStartGame();
      const cards = document.querySelectorAll('.card-word');
      cards.forEach((card) => card.removeEventListener('pointerup', check));
    }
  }
}

function removeEventsForCards() {
  const cards = document.querySelectorAll('.card-word');
  cards.forEach((card) => card.removeEventListener('pointerup', check));
}

function addEventForCards() {
  const cards = document.querySelectorAll('.card-word');
  cards.forEach((card) => card.addEventListener('pointerup', check));
}

function getGame() {
  if (!arrayWords.length) {
    getButtonRepeat();
    let category = {};
    const difCategory = getDifficultCategory();
    if (Object.keys(difCategory).length) {
      category = difCategory;
    } else {
      category = getCategoryObject();
    }
    getArrayWords(category);
    addEventForCards();
  }
  getAudioWord();
}

function resetGame(e) {
  if (e.currentTarget === buttonStatus) {
    changeButtonStartGame();
  } else {
    getButtonStartGame();
  }
  clearGame();
  removeEventsForCards();
}

buttonGame.addEventListener('pointerup', getGame);
buttonStatus.addEventListener('pointerup', resetGame);
menuLinks.forEach((element) => {
  element.addEventListener('pointerup', resetGame);
});
menuLinks.forEach((element) => {
  element.addEventListener('pointerup', clearCategory);
});
