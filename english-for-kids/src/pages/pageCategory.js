import getArrayCategories from './mainPage';
import getIsStatusTrain from '../status/status';
import createCardWord from '../cards/createCardWord';

const wrapper = document.querySelector('.wrapper');
const cards = document.querySelectorAll('.card');
let words = [];

function selectCategory(e) {
  const categories = getArrayCategories();
  const name = e.currentTarget.getAttribute('data-name');
  const category = categories.find((el) => el.name === name);
  return category.words;
}

function changeStylesForCards() {
  const wordsHtml = document.querySelectorAll('.container-name-word');
  const wordsImages = document.querySelectorAll('.card-word-image');
  wordsHtml.forEach((word) => word.classList.toggle('play-status-word'));
  wordsImages.forEach((image) => image.classList.toggle('play-status-word-image'));
}

function getSound(e) {
  if (getIsStatusTrain()) {
    const nameWord = e.currentTarget.getAttribute('data-word');
    const objWord = words.find((el) => el.word === nameWord);
    objWord.getAudio();
  }
}

function addEventsForCards() {
  const cardsWords = document.querySelectorAll('.card-word');
  cardsWords.forEach((card) => card.addEventListener('click', getSound));
}

function createCardsOfWords(e) {
  words = selectCategory(e);
  cards.forEach((el) => el.remove());
  words.forEach((el) => wrapper.append(createCardWord(el)));
  addEventsForCards();
  if (!getIsStatusTrain()) {
    changeStylesForCards();
  }
}

cards.forEach((card) => card.addEventListener('click', createCardsOfWords));
