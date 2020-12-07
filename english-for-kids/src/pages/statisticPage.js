import removeCards from './logicPages';
import changeStatusLinks from '../menu/statusLinks';
import createRow, { changePadding } from '../statistics/createRow';
import getArrayStatistics, { checkStatistics, clearStatistics } from '../statistics/localStorage';

const menuLinks = document.querySelectorAll('.menu-link');
const btnClearStatistics = document.querySelector('.btn-reset');

function getStatistics() {
  const table = document.querySelector('.table-statistics');
  const arrStatistics = getArrayStatistics();
  for (let i = 0; i < arrStatistics.length; i += 1) {
    table.append(createRow(arrStatistics[i].split(':')));
  }
  changePadding();
}

function getStatisticsPage(e) {
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

menuLinks.forEach((link) => link.addEventListener('pointerup', getStatisticsPage));
document.addEventListener('resize', changePadding);
btnClearStatistics.addEventListener('pointerup', getClearStatistics);
checkStatistics();
