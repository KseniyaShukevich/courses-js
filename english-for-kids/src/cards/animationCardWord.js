let timeoutId = 0;
let isAnimation = false;

function findCard(e) {
  const cards = document.querySelectorAll('.card-word');
  const word = e.currentTarget.getAttribute('data-word');
  const card = Array.from(cards).find((el) => el.getAttribute('data-word') === word);
  return card;
}

function removeClasses(card) {
  const translation = card.querySelector('.container-translation');
  translation.classList.remove('word-reverse');
  const word = card.querySelector('.container-name-word');
  word.classList.remove('displayNone');
  const image = card.querySelector('.card-word-image');
  image.classList.remove('reverse');
}

function delateSetTimeout() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
}

function getMainOfCard(e) {
  isAnimation = false;
  const card = e.currentTarget;
  const container = card.querySelector('.container-card');
  container.classList.remove('animation-card');
  delateSetTimeout();
  setTimeout(() => {
    removeClasses(card);
  }, 200);
  setTimeout(() => {
    card.classList.remove('z-index');
  }, 600);
  card.removeEventListener('mouseleave', getMainOfCard);
}

function addClasses(card) {
  const translation = card.querySelector('.container-translation');
  translation.classList.add('word-reverse');
  const word = card.querySelector('.container-name-word');
  word.classList.add('displayNone');
  const image = card.querySelector('.card-word-image');
  image.classList.add('reverse');
}

function getAnimation(e) {
  isAnimation = true;
  const card = findCard(e);
  const container = card.querySelector('.container-card');
  card.classList.add('z-index');
  container.classList.add('animation-card');
  timeoutId = setTimeout(() => {
    addClasses(card);
  }, 200);
  card.addEventListener('mouseleave', getMainOfCard);
}

export default function addAnimation() {
  const rotates = document.querySelectorAll('.word-rotate');
  rotates.forEach((el) => el.addEventListener('click', getAnimation));
}

export function getIsAnimation() {
  return isAnimation;
}
