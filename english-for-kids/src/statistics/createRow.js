export function changePadding() {
  const caption = document.querySelector('.container-caption-table');
  const containerTable = document.querySelector('.container-table');
  const width = containerTable.offsetWidth;
  const clintWidth = containerTable.clientWidth;
  caption.style.paddingRight = `${width - clintWidth + 1}px`;
}

function createTd(text, className = 'word-statistics') {
  const td = document.createElement('td');
  td.classList.add('td-statistics', className);
  td.textContent = text;
  return td;
}

export default function createRow(arr) {
  const row = document.createElement('tr');
  row.classList.add('row-statistics');
  const indexFirsNumber = 3;
  for (let i = 0; i < indexFirsNumber; i += 1) {
    row.append(createTd(arr[i]));
  }
  for (let i = indexFirsNumber; i < arr.length; i += 1) {
    row.append(createTd(arr[i], 'number-statistics'));
  }
  return row;
}
