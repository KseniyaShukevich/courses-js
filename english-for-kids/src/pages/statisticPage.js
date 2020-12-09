import removeCards from './logicPages';
import changeStatusLinks from '../menu/statusLinks';
import createRow, { changePadding } from '../statistics/createRow';
import getArrayStatistics, { checkStatistics, clearStatistics } from '../statistics/localStorage';
import { getSort } from '../statistics/sortStatistics';

const menuLinks = document.querySelectorAll('.menu-link');
const btnClearStatistics = document.querySelector('.btn-reset');
const buttonsTable = document.querySelectorAll('.heading-table');
const buttonStatus = document.querySelector('.button-header');
const btnDifficultWords = document.querySelector('.btn-difficult-words');
let isStatisticsPage = false;

function getStatistics(arrStatistics = getArrayStatistics()) {
  const table = document.querySelector('.table-statistics');
  for (let i = 0; i < arrStatistics.length; i += 1) {
    table.append(createRow(arrStatistics[i].split(':')));
  }
  changePadding();
}

function removeButton() {
  setTimeout(() => {
    const btn = document.querySelector('.button-start-game');
    if (isStatisticsPage && btn.classList.contains('height-button')) {
      btn.classList.remove('height-button');
    }
  }, 300);
}

function setStatusStatistics() {
  isStatisticsPage = false;
}

function setIsStatistics(e) {
  const link = e.currentTarget.getAttribute('data-link');
  if (link !== 'Statistics') {
    isStatisticsPage = false;
  }
}

function removeRows() {
  const rows = document.querySelectorAll('.row-statistics');
  if (rows) {
    rows.forEach((row) => row.remove());
  }
}

function getStatisticsPage(e) {
  isStatisticsPage = true;
  removeRows();
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

menuLinks.forEach((link) => link.addEventListener('click', getStatisticsPage));
menuLinks.forEach((link) => link.addEventListener('click', setIsStatistics));
document.addEventListener('resize', changePadding);
btnClearStatistics.addEventListener('click', getClearStatistics);
buttonsTable.forEach((btn) => btn.addEventListener('click', doSort));
buttonStatus.addEventListener('click', removeButton);
btnDifficultWords.addEventListener('click', setStatusStatistics);
checkStatistics();
