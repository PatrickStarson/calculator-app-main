const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const deleteBtn = document.querySelector('.delBtn');
const resetBtn = document.querySelector('.resetBtn');
const equal = document.querySelector('.equalBtn');

let justEvaluated = false; // track if result was just shown

onload = resetDisplay();

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (justEvaluated) {
      if (!isNaN(value) || value === ".") {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
      justEvaluated = false;
    } else {
      display.textContent += value;
    }
  });
});

deleteBtn.addEventListener('click', () => {
  display.textContent = display.textContent.slice(0, -1);
});

resetBtn.addEventListener('click', resetDisplay);

function add(a, b) {
  return a + b;
};
function subtract(a, b) {
  return a - b;
};
function multiply(a, b) {
  return a * b;
};
function divide(a, b) {
  return b === 0 ? 'Error' : a / b;
};

function operate(a, operator, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return 'Error';
  }
};

equal.addEventListener('click', () => {
  const expression = display.textContent;

  const match = expression.match(/^(\d*\.?\d+)([+\-*/])(\d*\.?\d+)$/);

  if (!match) {
    display.textContent = 'Error';
    justEvaluated = true;
    return;
  }

  const [, number1, operator, number2] = match;
  const result = operate(Number(number1), operator, Number(number2));

  display.textContent = result;
  justEvaluated = true; // set flag so we know "=" was pressed
});

function resetDisplay() {
  display.textContent = '';
  justEvaluated = false;
}
