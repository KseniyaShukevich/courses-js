const buttonStatus = document.querySelector('.button-header');
const heading = document.querySelector('.heading');
const navMenu = document.querySelector('.nav-menu');
const textStatus = document.querySelector('.status');
const decorButton = document.querySelector('.button');
let isStatusTrain = true;

function toggleStatusStyle(elem, class1, class2) {
  elem.classList.toggle(class1);
  elem.classList.toggle(class2);
}

function changeStatus() {
  if (isStatusTrain) {
    isStatusTrain = false;
    textStatus.textContent = 'play';
  } else {
    isStatusTrain = true;
    textStatus.textContent = 'train';
  }
}

export function changeStylesCardsBackground() {
  const cardsBackground = document.querySelectorAll('.card-background');
  const wordsHtml = document.querySelectorAll('.container-name-word');
  const wordsImages = document.querySelectorAll('.card-word-image');
  if (cardsBackground.length) {
    cardsBackground.forEach((card) => {
      toggleStatusStyle(card, 'status-train', 'status-play');
    });
  } else if (wordsHtml.length) {
    wordsHtml.forEach((word) => word.classList.toggle('play-status-word'));
    wordsImages.forEach((image) => image.classList.toggle('play-status-word-image'));
  }
}

function changeStyles() {
  toggleStatusStyle(buttonStatus, 'status-train', 'status-play');
  toggleStatusStyle(navMenu, 'status-train', 'status-play');
  toggleStatusStyle(heading, 'status-train-heading', 'status-play-heading');
  textStatus.classList.toggle('play-order-text');
  decorButton.classList.toggle('play-order-button');
  changeStylesCardsBackground();
}

function changeStatusStyles() {
  changeStatus();
  changeStyles();
}

export default function getIsStatusTrain() {
  return isStatusTrain;
}

buttonStatus.addEventListener('pointerup', changeStatusStyles);
