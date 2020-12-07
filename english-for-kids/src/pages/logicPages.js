import createCardWord from '../cards/createCardWord';
import getIsStatusTrain, { getButtonStartGame } from '../status/status';
import { getArrayCategories } from './createObjectCategory';
import addAnimation from '../cards/animationCardWord';
import { addEventsStatisticsClicks } from '../statistics/localStorage';

const wrapper = document.querySelector('.wrapper');
let words = [];

export default function removeCards() {
  const cardsCategory = document.querySelectorAll('.card');
  const cardsWord = document.querySelectorAll('.card-word');
  const wrapperStatistics = document.querySelector('.wrapper-statistics');
  if (cardsCategory.length) {
    cardsCategory.forEach((el) => el.remove());
  } else if (cardsWord.length) {
    cardsWord.forEach((el) => el.remove());
  } else {
    wrapperStatistics.classList.remove('displayBlock');
  }
}

function changeStylesForCards() {
  const wordsHtml = document.querySelectorAll('.container-name-word');
  const wordsImages = document.querySelectorAll('.card-word-image');
  const translation = document.querySelectorAll('.container-translation');
  translation.forEach((word) => word.classList.toggle('play-status-word'));
  wordsHtml.forEach((word) => word.classList.toggle('play-status-word'));
  wordsImages.forEach((image) => image.classList.toggle('play-status-word-image'));
  getButtonStartGame();
}

function getSound(e) {
  const rotate = e.currentTarget.querySelector('.word-rotate');
  if (getIsStatusTrain() && e.target !== rotate) {
    const nameWord = e.currentTarget.getAttribute('data-word');
    const objWord = words.find((el) => el.word === nameWord);
    objWord.getAudio();
  }
}

function addEventsForCards() {
  const cardsWords = document.querySelectorAll('.card-word');
  cardsWords.forEach((card) => card.addEventListener('pointerup', getSound));
  addAnimation();
}

function selectCategory(e, attribute) {
  const categories = getArrayCategories();
  const name = e.currentTarget.getAttribute(attribute);
  const category = categories.find((el) => el.name === name);
  return category.words;
}

export function fillCards(w = words, category = {}) {
  if (Object.keys(category).length) {
    words = category.words;
  }
  w.forEach((el) => wrapper.append(createCardWord(el)));
  addEventsForCards();
  addEventsStatisticsClicks();
  if (!getIsStatusTrain()) {
    changeStylesForCards();
  }
}

export function setWords(e, attribute) {
  words = selectCategory(e, attribute);
}
