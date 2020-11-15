import createNodeMenu, { changeDisplayNodes } from './logicMenu';

const containerMenu = document.createElement('div');
const containerContentMenu = document.createElement('div');

function createMainMenu() {
  containerContentMenu.append(createNodeMenu('button-menu main btn-new-game', 'Новая игра'));
  containerContentMenu.append(createNodeMenu('button-menu main btn-settings', 'Настройки'));
}

function getSaveSize() {
  let size = 4;
  let arraySaveGame = localStorage.getItem('arraySaveGame');
  if (arraySaveGame && arraySaveGame !== 'null') {
    arraySaveGame = arraySaveGame.split(',');
    size = +arraySaveGame[arraySaveGame.length - 2];
  }
  return size;
}

function createSelect() {
  const select = document.createElement('select');
  select.className = 'select settings';
  const size = getSaveSize();
  for (let i = 3; i < 9; i += 1) {
    const option = document.createElement('option');
    if (i === size) {
      option.setAttribute('selected', 'selected');
    }
    option.value = i;
    option.textContent = `${i}x${i}`;
    select.append(option);
  }

  return select;
}

function createMessage(text) {
  const message = document.createElement('div');
  message.className = 'message settings';
  message.textContent = text;

  return message;
}

function createSettingsMenu() {
  containerContentMenu.append(createNodeMenu('header settings', 'Настройки'));
  containerContentMenu.append(createNodeMenu('setting settings', 'Размер поля'));
  containerContentMenu.append(createSelect());
  containerContentMenu.append(createMessage('Сохранено. Начните новую игру.'));
  containerContentMenu.append(createNodeMenu('button-menu settings exit-settings', 'Назад'));
}

function hideSettingsMenu() {
  const settings = document.querySelectorAll('.settings');
  changeDisplayNodes(settings, 'none');
}

containerMenu.className = 'container-menu';
containerContentMenu.className = 'container-content-menu';
containerMenu.append(containerContentMenu);

createMainMenu();
createSettingsMenu();
document.body.append(containerMenu);

hideSettingsMenu();
