export default function createNode(classes, text) {
  const node = document.createElement('div');
  node.className = classes;
  node.textContent = text;

  return node;
}

export function changeDisplayNodes(nodes, value) {
  nodes.forEach((item) => {
    // eslint-disable-next-line no-param-reassign
    item.style.display = value;
  });
}
