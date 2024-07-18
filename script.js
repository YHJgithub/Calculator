const display = document.querySelector(".display");
let firstNumber;
let operator;
let secondNumber;
let displayValue = "0";

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.textContent);
  });
});

function handleInput(input) {
  if (!isNaN(input) || input === ".") {
    handleNumber(input);
  }
}

function handleNumber(number) {
  displayValue = number;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = displayValue;
}

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
  return a / b;
}

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      return "Invalid operator";
  }
}
