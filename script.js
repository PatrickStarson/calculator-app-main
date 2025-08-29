const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const deleteBtn = document.querySelector('.delBtn');
const resetBtn = document.querySelector('.resetBtn');
const equal = document.querySelector('.equalBtn');
const themeToggles = document.querySelectorAll('input[name="toggle"]');
const toggleCircle = document.querySelector('.toggle-circle');

let justEvaluated = false; // track if result was just shown

const body = document.body;

// Helper to set theme and toggle position
function setTheme(themeClass) {
  body.classList.remove('theme-1', 'theme-2', 'theme-3');
  body.classList.add(themeClass);

  // Remove previous position classes
  toggleCircle.classList.remove('theme-1-pos', 'theme-2-pos', 'theme-3-pos');
  // Add new position class
  if (themeClass === 'theme-1') {
    toggleCircle.classList.add('theme-1-pos');
  } else if (themeClass === 'theme-2') {
    toggleCircle.classList.add('theme-2-pos');
  } else if (themeClass === 'theme-3') {
    toggleCircle.classList.add('theme-3-pos');
  }
}

// On page load, set theme from localStorage or default to theme-1
window.onload = function() {
  resetDisplay();
  let savedTheme = localStorage.getItem('theme');
  let themeToApply = savedTheme || 'theme-1';
  setTheme(themeToApply);

  // Set the correct radio toggle as checked
  themeToggles.forEach((toggle) => {
    toggle.checked = toggle.classList.contains(themeToApply);
  });
};

// Listen for changes on each toggle input
themeToggles.forEach((toggle) => {
  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      // Save selected theme to localStorage
      if (toggle.classList.contains('theme-1')) {
        localStorage.setItem('theme', 'theme-1');
        setTheme('theme-1');
      } else if (toggle.classList.contains('theme-2')) {
        localStorage.setItem('theme', 'theme-2');
        setTheme('theme-2');
      } else if (toggle.classList.contains('theme-3')) {
        localStorage.setItem('theme', 'theme-3');
        setTheme('theme-3');
      }
    }
    // The CSS will now update based on the theme class on body
  });
});

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
      // If display is "0", replace it with the new value
      if (display.textContent === "0") {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
    }
  });
});

deleteBtn.addEventListener('click', () => {
  // Remove last character
  display.textContent = display.textContent.slice(0, -1);
  // If display is now empty, show "0"
  if (display.textContent === "") {
    display.textContent = "0";
  }
});

resetBtn.addEventListener('click', resetDisplay);

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? 'Error' : a / b;
}

function operate(a, operator, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return 'Error';
  }
}

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
  display.textContent = '0';
  justEvaluated = false;
}