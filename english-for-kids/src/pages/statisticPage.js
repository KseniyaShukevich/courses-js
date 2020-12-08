import removeCards from './logicPages';
import changeStatusLinks from '../menu/statusLinks';
import createRow, { changePadding } from '../statistics/createRow';
import getArrayStatistics, { checkStatistics, clearStatistics } from '../statistics/localStorage';
import { getSort } from '../statistics/sortStatistics';

const menuLinks = document.querySelectorAll('.menu-link');
const btnClearStatistics = document.querySelector('.btn-reset');
const buttonsTable = document.querySelectorAll('.heading-table');
const buttonStatus = document.querySelector('.button-header');

function getStatistics(arrStatistics = getArrayStatistics()) {
  const table = document.querySelector('.table-statistics');
  for (let i = 0; i < arrStatistics.length; i += 1) {
    table.append(createRow(arrStatistics[i].split(':')));
  }
  changePadding();
}

function removeButton() {
  const btn = document.querySelector('.button-start-game');
  if (btn.classList.contains('height-button')) {
    btn.classList.remove('height-button');
  }
}

function removeStartGame() {
  const wrapStatistics = document.querySelector('.wrapper-statistics');
  if (wrapStatistics.classList.contains('displayBlock')) {
    removeButton();
  }
}

function getStatisticsPage(e) {
  removeButton();
  const link = e.currentTarget.getAttribute('data-link');
  if (link === 'Statistics') {
    const wrapperStatistics = document.querySelector('.wrapper-statistics');
    if (!wrapperStatistics.classList.contains('displayBlock')) {
      removeCards();
      changeStatusLinks(link);
      wrapperStatistics.classList.add('displayBlock');
      getStatistics();
    }
  }
}

function removeRows() {
  const rows = document.querySelectorAll('.row-statistics');
  rows.forEach((row) => row.remove());
}

function getClearStatistics() {
  clearStatistics();
  removeRows();
  getStatistics();
}

function doSort(e) {
  const result = getSort(e);
  removeRows();
  getStatistics(result);
}

menuLinks.forEach((link) => link.addEventListener('pointerup', getStatisticsPage));
document.addEventListener('resize', changePadding);
btnClearStatistics.addEventListener('pointerup', getClearStatistics);
buttonsTable.forEach((btn) => btn.addEventListener('pointerup', doSort));
buttonStatus.addEventListener('pointerup', removeStartGame);
checkStatistics();
