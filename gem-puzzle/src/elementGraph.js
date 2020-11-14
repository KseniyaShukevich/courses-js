import getSize from './settings';
import Node from './node';

export default class Graph {
  constructor() {
    this.head = null;
    this.length = 0;
    this.moves = 0;
  }

  addNext(value) {
    if (this.length === 0) {
      this.head = new Node(value);
    } else {
      let current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = new Node(value);
      current.next.position = current.position + 1;
    }

    this.length += 1;
  }

  // eslint-disable-next-line class-methods-use-this
  fun() {
    return true;
  }

  createGraphOfElements() {
    const size = getSize();
    let current = this.head;
    let neighborBottom = current;

    current.right = current.next;
    current.next.left = current;
    const count = current.position + size;
    for (let i = current.position; i < count; i += 1) {
      if (neighborBottom.next) {
        neighborBottom = neighborBottom.next;
      }
    }
    current.bottom = neighborBottom;
    neighborBottom.top = current;

    while (current.next) {
      current = current.next;
      neighborBottom = current.next;
      if (current.position % size !== 0) {
        current.right = current.next;
        current.next.left = current;
      }
      if (Math.ceil(current.position / size) < size) {
        for (let i = current.position; i < current.position + (size - 1); i += 1) {
          if (neighborBottom.next) {
            neighborBottom = neighborBottom.next;
          }
        }
        current.bottom = neighborBottom;
        neighborBottom.top = current;
      }
    }
  }

  getPosition(value) {
    let current = this.head;

    while (current) {
      if (current.value !== +value) {
        current = current.next;
      } else {
        break;
      }
    }

    return current.position;
  }

  getNeighbor(value) {
    const arr = [];
    let current = this.head;

    while (current) {
      if (current.value !== +value) {
        current = current.next;
      } else {
        break;
      }
    }

    const sw = (cur, side) => {
      this.size = getSize();
      this.side = side;
      this.cur = cur;
      if (this.side && this.side.value === 0) {
        if (this.side === current.left) {
          let left = 0;
          left = ((this.cur.position - 2) % this.size) * (100 / this.size);
          arr.push('left', left, this.cur.position);
        } else if (this.side === current.top) {
          let top = 0;
          top = Math.floor(((
            this.cur.position - this.size) - 1) / this.size) * (100 / this.size);
          arr.push('top', top, this.cur.position);
        } else if (this.side === current.right) {
          let left = 0;
          left = ((this.cur.position) % this.size) * (100 / this.size);
          arr.push('right', left, this.cur.position);
        } else {
          let top = 0;
          top = Math.floor((this.cur.position + (this.size - 1)) / this.size) * (100 / this.size);
          arr.push('bottom', top, this.cur.position);
        }
      }
    };

    sw(current, current.left);
    sw(current, current.bottom);
    sw(current, current.right);
    sw(current, current.top);

    return arr;
  }

  searchAndSwap(value, htmlElement) {
    let current = this.head;

    while (current) {
      if (current.value !== +value) {
        current = current.next;
      } else {
        break;
      }
    }

    const swap = (cur, side, htmlElem) => {
      this.htmlElement = htmlElem;
      this.size = getSize();
      this.side = side;
      this.cur = cur;
      if (this.side && this.side.value === 0) {
        this.moves += 1;
        if (this.side === current.left) {
          this.htmlElement.style.left = `${
            ((this.cur.position - 2) % this.size) * (100 / this.size)}%`;
        } else if (this.side === current.top) {
          this.htmlElement.style.top = `${
            Math.floor((((this.cur.position - this.size) - 1) / this.size)) * (100 / this.size)}%`;
        } else if (this.side === current.right) {
          this.htmlElement.style.left = `${
            ((this.cur.position) % this.size) * (100 / this.size)}%`;
        } else {
          this.htmlElement.style.top = `${
            Math.floor(((this.cur.position + (this.size - 1)) / this.size)) * (100 / this.size)}%`;
        }
        const neighbor = this.side;
        const buf = this.cur.value;
        this.cur.value = neighbor.value;
        neighbor.value = buf;
      }
    };

    swap(current, current.left, htmlElement);
    swap(current, current.bottom, htmlElement);
    swap(current, current.right, htmlElement);
    swap(current, current.top, htmlElement);
  }
}
