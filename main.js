let currentNumber = '0';
let previousNumber = null;
let operator = null;

const display = document.getElementById('display');

const clearButton = document.querySelector('[onclick="clearDisplay()"]');

function updateDisplay() {
  display.textContent = currentNumber;
  toggleClearButton
}

function toggleClearButton() {
  if (currentNumber === '0' && previousNumber === null && operator === null) {
    clearButton.textContent = 'AC';
  } else {
    clearButton.textContent = 'X';
  }
}

function appendNumber(number) {
  if (currentNumber === '0') {
    currentNumber = number.toString();
  } else {
    currentNumber += number;
  }
  updateDisplay();
}

function appendDot() {
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
  }
  updateDisplay();
}


// function clearDisplay() {
//   currentNumber = '0';
//   previousNumber = null;
//   operator = null;
//   updateDisplay();
// }

function clearDisplay() {
  if (clearButton.textContent === 'X') {
    clearLastDigit(); 
  } else {
    currentNumber = '0';
    previousNumber = null;
    operator = null;
    updateDisplay();
  }
}

function clearLastDigit() {
  if (currentNumber.length > 1) {
    currentNumber = currentNumber.slice(0, -1);
  } else {
    currentNumber = '0';
  }
  updateDisplay();
}

function toggleSign() {
  currentNumber = (parseFloat(currentNumber) * -1).toString();
  updateDisplay();
}

function applyPercent() {
  currentNumber = (parseFloat(currentNumber) / 100).toString();
  updateDisplay();
}

function setOperator(op) {
  if (previousNumber === null) {
    previousNumber = currentNumber;
    currentNumber = '0';
  } else if (operator) {
    calculate();
  }
  operator = op;
}

function calculate() {
  if (operator && previousNumber !== null) {
    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);

    switch (operator) {
      case '+':
        currentNumber = (num1 + num2).toString();
        break;
      case '-':
        currentNumber = (num1 - num2).toString();
        break;
      case '*':
        currentNumber = (num1 * num2).toString();
        break;
      case '/':
        currentNumber = num2 === 0 ? 'Error' : (num1 / num2).toString();
        break;
    }

    previousNumber = null;
    operator = null;
    updateDisplay();
  }
}