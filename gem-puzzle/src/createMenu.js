import createNodeMenu, { changeDisplayNodes } from './logicMenu';

const containerMenu = document.createElement('div');
const containerContentMenu = document.createElement('div');

function createMainMenu() {
  containerContentMenu.append(createNodeMenu('button-menu main btn-new-game', 'Новая игра'));
  containerContentMenu.append(createNodeMenu('button-menu main btn-rating', 'Рейтинг'));
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

function createSettingSound() {
  const isSound = localStorage.getItem('saveSoundGame');
  const container = document.createElement('div');
  container.className = 'setting settings';
  const radio = document.createElement('input');
  radio.type = 'checkbox';
  if (!isSound || +isSound === 1) {
    radio.setAttribute('checked', 'checked');
  }
  container.textContent = '  Звук  ';
  radio.className = 'sound-setting';
  container.append(radio);
  return container;
}

function createSettingsMenu() {
  containerContentMenu.append(createNodeMenu('header settings', 'Настройки'));
  containerContentMenu.append(createNodeMenu('setting settings', 'Размер поля'));
  containerContentMenu.append(createSelect());
  containerContentMenu.append(createSettingSound());
  containerContentMenu.append(createMessage('Сохранено. Начните новую игру.'));
  containerContentMenu.append(createNodeMenu('button-menu settings exit-settings', 'Назад'));
}

function createGratulate() {
  containerContentMenu.append(createNodeMenu('header gratulate', 'УРАААА'));
  containerContentMenu.append(createNodeMenu('message-gratulate gratulate', ''));
  containerContentMenu.append(createNodeMenu('button-menu gratulate exit-gratulate', 'Назад'));
}

function createRatingColumn(cl, header) {
  const column = document.createElement('div');
  column.className = 'column-rating rating';
  column.append(createNodeMenu('header-rating rating', header));
  for (let i = 0; i < 10; i += 1) {
    column.append(createNodeMenu(cl, ''));
  }
  return column;
}

function createBodyRating() {
  const ratingContainer = document.createElement('div');
  ratingContainer.className = 'rating-body rating';
  ratingContainer.append(createRatingColumn('date-rating text-rating rating', 'Дата'));
  ratingContainer.append(createRatingColumn('time-rating text-rating rating', 'Время'));
  ratingContainer.append(createRatingColumn('moves-rating text-rating rating', 'Шагов'));
  ratingContainer.append(createRatingColumn('field-rating text-rating rating', 'Поле'));
  return ratingContainer;
}

function createRating() {
  containerContentMenu.append(createNodeMenu('header rating', 'Рейтинг'));
  containerContentMenu.append(createBodyRating());
  containerContentMenu.append(createNodeMenu('button-menu rating exit-rating', 'Назад'));
}

function hideGratulate() {
  const gratulateMenu = document.querySelectorAll('.gratulate');
  changeDisplayNodes(gratulateMenu, 'none');
}

function hideSettingsMenu() {
  const settings = document.querySelectorAll('.settings');
  changeDisplayNodes(settings, 'none');
}

function hideRating() {
  const rating = document.querySelectorAll('.rating');
  changeDisplayNodes(rating, 'none');
}

containerMenu.className = 'container-menu';
containerContentMenu.className = 'container-content-menu';
containerMenu.append(containerContentMenu);

createMainMenu();
createSettingsMenu();
createGratulate();
createRating();
document.body.append(containerMenu);

hideSettingsMenu();
hideRating();
hideGratulate();
