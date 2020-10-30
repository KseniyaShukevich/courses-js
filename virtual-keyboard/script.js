const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    language: "en"
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.elements.main.addEventListener("focusin", () => element.focus());
        element.addEventListener("input", () => this.properties.value = element.value);
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "shift", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "en",
      "space", "left", "right"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            let input = document.querySelector(".use-keyboard-input");
            let cursorPos = input.selectionStart;
            let buf = this.properties.value.slice();

            if (cursorPos > 0) {
              this.properties.value = buf.slice(0, cursorPos - 1) + buf.slice(cursorPos);
              this._triggerEvent("oninput");
              input.setSelectionRange(cursorPos-1, cursorPos-1);
            }
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            let input = document.querySelector(".use-keyboard-input");
            let cursorPos = input.selectionStart;
            let buf = this.properties.value.slice();

            this.properties.value = buf.slice(0, cursorPos) + '\n' + buf.slice(cursorPos);
            this._triggerEvent("oninput");
            input.setSelectionRange(cursorPos+1, cursorPos+1);
          });

          break;

        case "left":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_left");

          keyElement.addEventListener("click", () => {
            this._getLeft();
          });

          break;

        case "right":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_arrow_right");

          keyElement.addEventListener("click", () => {
            this._getRight();
          });

          break;

        case "en":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = `<div class="lang">${key}</div>`;

          keyElement.addEventListener("click", () => {
            this._language();
            this._getKeysLanguage();
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            let input = document.querySelector(".use-keyboard-input");
            let cursorPos = input.selectionStart;
            let buf = this.properties.value.slice();

            this.properties.value = buf.slice(0, cursorPos) + ' ' + buf.slice(cursorPos);
            this._triggerEvent("oninput");
            input.setSelectionRange(cursorPos+1, cursorPos+1);
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        case "shift":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("arrow_upward");

          keyElement.addEventListener("click", () => {
            this._toggleShift();
            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            let input = document.querySelector(".use-keyboard-input");
            let cursorPos = input.selectionStart;
            let buf = this.properties.value.slice();
            let keyContent = this.elements.keys[keyLayout.indexOf(key.toLowerCase())].textContent;

            if (this.properties.capsLock && !this.properties.shift) {
              this.properties.value = buf.slice(0, cursorPos) + keyContent.toUpperCase() + buf.slice(cursorPos);

            } else if (this.properties.shift && !this.properties.capsLock) {
              this.properties.value = buf.slice(0, cursorPos) + keyContent + buf.slice(cursorPos);
            } else if (this.properties.shift && this.properties.capsLock) {
              this.properties.value = buf.slice(0, cursorPos) + keyContent.toLowerCase() + buf.slice(cursorPos);
            } else {
              this.properties.value = buf.slice(0, cursorPos) + keyContent + buf.slice(cursorPos);
            }

            this._triggerEvent("oninput");
            input.setSelectionRange(cursorPos+1, cursorPos+1);
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _getLeft() {
    let input = document.querySelector(".use-keyboard-input");
    let start = input.selectionStart;

    if(start > 0) {
      input.setSelectionRange(start - 1, start - 1);
    }
  },

  _getRight() {
    let input = document.querySelector(".use-keyboard-input");
    let start = input.selectionStart;

    if(start < this.properties.value.length) {
      input.setSelectionRange(start + 1, start + 1);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    if (!this.properties.shift) {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
      }
    } else {
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = this.properties.capsLock ? key.textContent.toLowerCase() : key.textContent.toUpperCase();
        }
      }
    }
  },

  _language() {
    let langEl = document.querySelector('.lang');
    if (this.properties.language === "en") {
      this.properties.language = "ru";
    } else {
      this.properties.language = "en";
    }

    for (const key of this.elements.keys) {
      if (key.textContent === "en") {
        langEl.textContent = "ru";
      } else if (key.textContent === 'ru') {
        langEl.textContent = 'en';
      }
    }
  },

  _getKeysLanguage() {
    let arrKeys = this._getConstForShift();
    let lKeyLayout = '';

    if (this.properties.shift) {
      lKeyLayout = arrKeys[0];
      if (this.properties.capsLock) {
        lKeyLayout = lKeyLayout.map(key => key = key.toLowerCase());
      }
    } else {
      lKeyLayout = arrKeys[1];
      if (this.properties.capsLock) {
        lKeyLayout = lKeyLayout.map(key => key = key.toUpperCase());
      }
    }

    let count = 0;
      for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
          key.textContent = lKeyLayout[count];
          count++;
        }
      }
  },

  _toggleShift() {
    let arrKey =  this._getConstForShift();
    let shiftKeyLayout = arrKey[0];
    let keyLayoutNotShift = arrKey[1];

    this.properties.shift = !this.properties.shift;

    if (!this.properties.capsLock) {
      if (this.properties.shift) {
        let count = 0;
        for (const key of this.elements.keys) {
          if (this.properties.shift && key.childElementCount === 0) {
            key.textContent = shiftKeyLayout[count];
            count++;
          }
        }
      } else if (!this.properties.shift) {
        let count = 0;
        for (const key of this.elements.keys) {
          if (key.childElementCount === 0) {
            key.textContent = keyLayoutNotShift[count];
            count++;
          }
        }
      }
    } else {
      if (this.properties.shift) {
        let count = 0;
        for (const key of this.elements.keys) {
          if (this.properties.shift && key.childElementCount === 0) {
            key.textContent = shiftKeyLayout[count].toLowerCase();
            count++;
          }
        }
      } else if (!this.properties.shift) {
        let count = 0;
        for (const key of this.elements.keys) {
          if (key.childElementCount === 0) {
            key.textContent = keyLayoutNotShift[count].toUpperCase();
            count++;
          }
        }
      }
    }
  },

  _getConstForShift() {
    let arr = [];
    if (this.properties.language === "en") {
      const enShiftKeyLayout = [
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L",
        "Z", "X", "C", "V", "B", "N", "M", "<", ">", "/"
      ];
      const enKeyLayoutNotShift = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "a", "s", "d", "f", "g", "h", "j", "k", "l",
        "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      ];
      arr.push(enShiftKeyLayout, enKeyLayoutNotShift);
    } else {
      const ruShiftKeyLayout = [
        "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")",
        "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З",
        "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д",
        "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",",
      ];
      const ruKeyLayoutNotShift = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з",
        "ф", "ы", "в", "а", "п", "р", "о", "л", "д",
        "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
      ];
      arr.push(ruShiftKeyLayout, ruKeyLayoutNotShift);
    }

    return arr;
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});