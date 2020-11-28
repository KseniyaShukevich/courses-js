import getIsStatusTrain from '../status/status';

function addClassBackground(elem) {
  if (getIsStatusTrain) {
    elem.classList.add('status-train', 'card-background');
  } else {
    elem.classList.add('status-play', 'card-background');
  }
}

function createCardBackground() {
  const cardBackground = document.createElement('div');
  addClassBackground(cardBackground);
  return cardBackground;
}

function createCardImage(image) {
  const cardImage = document.createElement('div');
  cardImage.classList.add('card-image');
  cardImage.style.backgroundImage = `url(${image})`;
  return cardImage;
}

function createCardCategory(cardName) {
  const category = document.createElement('div');
  category.classList.add('category');
  category.textContent = cardName;
  return category;
}

export default function createCard(cardName, image) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.append(createCardBackground());
  card.append(createCardImage(image));
  card.append(createCardCategory(cardName));
  return card;
}
