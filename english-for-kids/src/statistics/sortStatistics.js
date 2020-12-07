class ObjSortIcon {
  constructor() {
    this.sortIcon = 0;
  }

  createSortIcon() {
    this.sortIcon = document.createElement('img');
    this.sortIcon.src = './img/sort.svg';
    this.sortIcon.classList.add('img-sort');
  }

  getSortIcon() {
    return this.sortIcon;
  }
}

const objSortIcon = new ObjSortIcon();
objSortIcon.createSortIcon();

const indexCategory = 0;
const indexWord = 1;
const indexTranslation = 2;
const indexClicks = 3;
const indexCorr = 4;
const indexErr = 5;
const indexPercent = 6;
let arrWords = [];

export default function getIcon() {
  return objSortIcon;
}

export function addSortIconInit(arr) {
  arrWords = arr;

  const buttons = document.querySelectorAll('.heading-table');
  const btn = Array.from(buttons).find((el) => el.getAttribute('data-name') === 'Category');
  btn.prepend(objSortIcon.getSortIcon());
}

function moveSortIcon(e) {
  const btn = e.currentTarget;
  btn.prepend(objSortIcon.getSortIcon());
  const newIcon = btn.querySelector('.img-sort');
  if (newIcon.classList.contains('rotate-sort-icon')) {
    newIcon.classList.remove('rotate-sort-icon');
  }
}

export function getSortString(index) {
  arrWords.sort((a, b) => {
    const el1 = a.split(':');
    const el2 = b.split(':');
    if (el1[index] > el2[index]) {
      return 1;
    }
    if (el1[index] === el2[index]) {
      return 0;
    }
    return -1;
  });

  return arrWords;
}

function getSortNumber(index) {
  arrWords.sort((a, b) => {
    const el1 = a.split(':');
    const el2 = b.split(':');
    return +el1[index] - +el2[index];
  });
}

function actionSort(e) {
  const btnName = e.currentTarget.getAttribute('data-name');
  if (btnName === 'Category') {
    getSortString(indexCategory);
  } else if (btnName === 'Word') {
    getSortString(indexWord);
  } else if (btnName === 'Translation') {
    getSortString(indexTranslation);
  } else if (btnName === 'Clicks') {
    getSortNumber(indexClicks);
  } else if (btnName === 'Correct') {
    getSortNumber(indexCorr);
  } else if (btnName === 'Wrong') {
    getSortNumber(indexErr);
  } else {
    getSortNumber(indexPercent);
  }
}

export function getSort(e) {
  const icon = e.currentTarget.querySelector('.img-sort');
  if (icon) {
    icon.classList.toggle('rotate-sort-icon');
    arrWords.reverse();
  } else {
    moveSortIcon(e);
    actionSort(e);
  }

  return arrWords;
}
