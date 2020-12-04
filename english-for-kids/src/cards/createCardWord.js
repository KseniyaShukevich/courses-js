function createCardImage(image) {
  const cardImage = document.createElement('div');
  cardImage.classList.add('card-word-image');
  cardImage.style.backgroundImage = `url(${image})`;
  return cardImage;
}

function createSvg(word) {
  const svg = document.createElement('img');
  svg.classList.add('word-rotate');
  svg.setAttribute('data-word', word);
  svg.src = './img/rotate.svg';
  svg.alt = 'rotate';
  return svg;
}

function createWord(word) {
  const cardWord = document.createElement('div');
  cardWord.classList.add('container-name-word');
  cardWord.textContent = word;
  cardWord.append(createSvg(word));
  return cardWord;
}

function createTranslationWord(word) {
  const translation = document.createElement('div');
  translation.classList.add('container-translation');
  translation.textContent = word;
  return translation;
}

function creatContainer(objWord) {
  const container = document.createElement('div');
  container.classList.add('container-card');
  container.setAttribute('data-word', objWord.word);
  container.append(createCardImage(objWord.image));
  container.append(createWord(objWord.word));
  container.append(createTranslationWord(objWord.translation));
  return container;
}

export default function createCardWord(objWord) {
  const card = document.createElement('div');
  card.classList.add('card-word');
  card.setAttribute('data-word', objWord.word);
  card.append(creatContainer(objWord));
  return card;
}
