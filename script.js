const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const deleteBtn = document.querySelector('.delBtn');
const resetBtn = document.querySelector('.resetBtn');
const equal = document.querySelector('.equalBtn');



onload = resetDisplay()

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    return display.textContent += button.textContent
  });
});

deleteBtn.addEventListener('click', () => {
  display.textContent = display.textContent.slice(0, -1);
});

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
  return a / b;
};

function operate (a, operator, b) {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a /b;
    default: return 'Error';
  }
};

equal.addEventListener ('click', () => {
  const expression = display.textContent;

  const match = expression.match(/^(\d*\.?\d+)([+\-*/])(\d*\.?\d+)$/);

  if(!match) {
    display.textContent = 'Error';
  }

  const [, number1, operator, number2] = match;

  const result = operate(Number(number1), operator, Number(number2));
  display.textContent = result;
})

function resetDisplay() {
  display.textContent = ''
}



