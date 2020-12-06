const buttonGame = document.querySelector('.button-start-game');

export default function getButtonStartGame() {
  buttonGame.textContent = 'Start game';
  buttonGame.classList.remove('button-repeat');
  buttonGame.removeAttribute('data-repeat');
}

export function changeButtonStartGame() {
  if (buttonGame.hasAttribute('data-repeat')) {
    setTimeout(() => getButtonStartGame(), 300);
  }
}

export function getButtonRepeat() {
  buttonGame.textContent = 'Repeat';
  buttonGame.classList.add('button-repeat');
  buttonGame.setAttribute('data-repeat', 'repeat');
}
