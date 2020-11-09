import { changeDisplayNodes } from './logicMenu';

const btnMain = document.querySelectorAll('.main');
const settings = document.querySelectorAll('.settings');
const message = document.querySelector('.message');
let size = 4;

function getMainMenu() {
  changeDisplayNodes(settings, 'none');
  changeDisplayNodes(btnMain, '');
}

function getSettingsMenu() {
  changeDisplayNodes(settings, '');
  message.style.opacity = '0';
  changeDisplayNodes(btnMain, 'none');
}

function getMessage(e) {
  size = e.target.value;
  message.style.opacity = '1';
  setTimeout(() => { message.style.opacity = '0'; }, 2000);
}

export default function getSize() {
  return size;
}

btnMain[1].addEventListener('click', getSettingsMenu);
settings[2].addEventListener('change', getMessage);
settings[4].addEventListener('click', getMainMenu);
