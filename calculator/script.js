const numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    clearButtons = document.querySelectorAll('.clear-btn'),
    decimalButton = document.getElementById('decimal'),
    display = document.getElementById('display');
let MemoryCurrentNumber = 0,
    MemoryNewNumber = false,
    MemoryPendingOperation = '';


for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];

    number.addEventListener('click', function(e) {
        numberPress(e.target.textContent);
    });
};

for (let i = 0; i < operations.length; i++) {
    let operationButton = operations[i];

    operationButton.addEventListener('click', function(e) {
        operation(e.target.textContent);
    });
}

for (let i = 0; i < clearButtons.length; i++) {
    let clearButton = clearButtons[i];

    clearButton.addEventListener('click', function(e) {
        clear(e.target.id);
    });
}

decimalButton.addEventListener('click', decimal);




function numberPress(number) {
    if (MemoryNewNumber) {
        if (display.value === '-') {
            display.value += number;
            MemoryNewNumber = false;
        } else {
        display.value = number;
        MemoryNewNumber = false;
        }
      } else {
        if (display.value === '0') {
          display.value = number;
        } else {
          display.value += number;
        }
      }
}

function operation(symbolOperation) {
    let localOperationMemory = display.value;

    if (localOperationMemory === '0' && symbolOperation === '-') {
        display.value = '-';
    } else {

    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        display.value = MemoryCurrentNumber;
      } else {
        MemoryNewNumber = true;
        if (MemoryPendingOperation === '+') {
          MemoryCurrentNumber += +localOperationMemory;
        }
        else if (MemoryPendingOperation === '-') {
          MemoryCurrentNumber -= +localOperationMemory;
        }
        else if (MemoryPendingOperation === '*') {
          MemoryCurrentNumber *= +localOperationMemory;
        }
        else if (MemoryPendingOperation === '/') {
          MemoryCurrentNumber /= +localOperationMemory;
        }
        else if (MemoryPendingOperation === '√') {
           if (+localOperationMemory >= 0) {
           MemoryCurrentNumber = Math.sqrt(+localOperationMemory);
          } else {
           MemoryCurrentNumber = 'Не надо так делать!';
          }
        }
        else if (MemoryPendingOperation === '^') {
            let localNumberMemory = MemoryCurrentNumber;

            for (let i = 1; i < +localOperationMemory; i++) {
                MemoryCurrentNumber *= +localNumberMemory;
            }
        }
        else {
          MemoryCurrentNumber = +localOperationMemory;
        }

        if (MemoryCurrentNumber.toString().indexOf('.') > -1) {
            display.value = +MemoryCurrentNumber.toFixed(5);
        } else {
            display.value = MemoryCurrentNumber;
        }

        MemoryPendingOperation = symbolOperation;
      }

      if (MemoryNewNumber && symbolOperation === '-') {
          display.value = symbolOperation;
      }

    }
}

function decimal(argument) {
    let localDecimalMemory = display.value;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }

    display.value = localDecimalMemory;
}

function clear(id) {
    if (id === 'ce') {
        display.value = 0;
        MemoryNewNumber = true;
    } else if ( id === 'c') {
        display.value = 0;
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0
        MemoryPendingOperation = '';
    }
}