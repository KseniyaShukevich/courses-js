const btnPause = document.querySelector('.btn-pause');

let isMenu = true;
let isGameStart = false;

function getStatusGame() {
  isGameStart = Boolean(+localStorage.getItem('isGameStart'));
}

export function getMenu() {
  const containerMenu = document.querySelector('.container-menu');
  const pause = document.querySelector('.btn-pause');
  isMenu = true;
  containerMenu.style.display = '';
  pause.textContent = 'Играть';
}

export function hideMenu() {
  const containerMenu = document.querySelector('.container-menu');
  const pause = document.querySelector('.btn-pause');
  isMenu = false;
  containerMenu.style.display = 'none';
  pause.textContent = 'Пауза';
}

export function doMenuFalse() {
  isMenu = false;
}

function setStatusMenu() {
  getStatusGame();
  if (isGameStart) {
    if (isMenu) {
      hideMenu();
    } else {
      getMenu();
    }
  }
}

export default function getStatusMenu() {
  return isMenu;
}

btnPause.addEventListener('click', setStatusMenu);
