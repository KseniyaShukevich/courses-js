const btnPause = document.querySelector('.btn-pause');
const select = document.querySelector('.select');
const btnNewGame = document.querySelector('.btn-new-game');

let isSelected = false;
let isMenu = true;
let isGameStart = false;

function getStatusGame() {
  isGameStart = Boolean(+localStorage.getItem('isGameStart'));
}

export function getMenu() {
  isSelected = false;
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

function setStatusMenu() {
  getStatusGame();
  if (isGameStart) {
    if (isMenu && !isSelected) {
      hideMenu();
    } else if (!isSelected) {
      getMenu();
    }
  }
}

export default function getStatusMenu() {
  return isMenu;
}

function changeStatus() {
  isSelected = true;
}

btnPause.addEventListener('click', setStatusMenu);
select.addEventListener('change', changeStatus);
btnNewGame.addEventListener('click', () => { isSelected = false; });
