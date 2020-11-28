const buttonStatus = document.querySelector('.button-header');
const heading = document.querySelector('.heading');
const navMenu = document.querySelector('.nav-menu');
const textStatus = document.querySelector('.status');
const decorButton = document.querySelector('.button');
let statusTrain = true;

function toggleStatusStyle(elem, class1, class2) {
  elem.classList.toggle(class1);
  elem.classList.toggle(class2);
}

function changeStatus() {
  if (statusTrain) {
    statusTrain = false;
    textStatus.textContent = 'play';
  } else {
    statusTrain = true;
    textStatus.textContent = 'train';
  }
}

function changeStylesCardsBackground() {
  const cardsBackground = document.querySelectorAll('.card-background');
  cardsBackground.forEach((card) => {
    toggleStatusStyle(card, 'status-train', 'status-play');
  });
}

function changeStyles() {
  toggleStatusStyle(buttonStatus, 'status-train', 'status-play');
  toggleStatusStyle(navMenu, 'status-train', 'status-play');
  toggleStatusStyle(heading, 'status-train-heading', 'status-play-heading');
  changeStylesCardsBackground();
  textStatus.classList.toggle('play-order-text');
  decorButton.classList.toggle('play-order-button');
}

function changeStatusStyles() {
  changeStatus();
  changeStyles();
}

export default function getIsStatusTrain() {
  return statusTrain;
}

buttonStatus.addEventListener('pointerup', changeStatusStyles);
