function createCardImage(image) {
  const cardImage = document.createElement('div');
  cardImage.classList.add('card-word-image');
  cardImage.style.backgroundImage = `url(${image})`;
  return cardImage;
}

function createSvg() {
  const svg = document.createElement('img');
  svg.classList.add('word-rotate');
  svg.src = './img/rotate.svg';
  svg.alt = 'rotate';
  return svg;
}

function createWord(word) {
  const cardWord = document.createElement('div');
  cardWord.classList.add('container-name-word');
  cardWord.textContent = word;
  cardWord.append(createSvg());
  return cardWord;
}

export default function createCardWord(objWord) {
  const card = document.createElement('div');
  card.classList.add('card-word');
  card.setAttribute('data-word', objWord.word);
  card.append(createCardImage(objWord.image));
  card.append(createWord(objWord.word));
  return card;
}
