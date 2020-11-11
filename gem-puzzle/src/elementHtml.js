export default function getHtmlElement(item, size, index) {
  if (item !== 0) {
    const element = document.createElement('div');
    element.className = 'element';
    element.textContent = item;
    element.style.left = `${(index % size) * (100 / size)}%`;
    element.style.top = `${Math.floor(index / size) * (100 / size)}%`;
    element.style.width = `${100 / size}%`;
    element.style.height = `${100 / size}%`;
    element.style.transition = 'all 1s';

    return element;
  }

  return false;
}
