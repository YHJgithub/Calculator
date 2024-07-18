document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display");
  let firstNumber = null;
  let operator = null;
  let secondNumber = null;
  let displayValue = "0";
  let waitingForSecondNumber = false;

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      handleInput(button.textContent);
    });
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key) || key === ".") {
      handleNumber(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      handleOperator(key);
    } else if (key === "Enter") {
      event.preventDefault(); // 防止在表单中按下回车键时提交表单
      handleEquals();
    } else if (key === "Backspace") {
      handleBackspace();
    } else if (key.toLowerCase() === "c") {
      handleClear();
    }
  });

  function handleInput(input) {
    if (!isNaN(input) || input === ".") {
      handleNumber(input);
    } else if (
      input === "+" ||
      input === "-" ||
      input === "*" ||
      input === "/"
    ) {
      handleOperator(input);
    } else if (input === "=") {
      handleEquals();
    } else if (input === "Clear") {
      handleClear();
    } else if (input === "⬅") {
      handleBackspace();
    }
  }

  function handleNumber(number) {
    if (waitingForSecondNumber) {
      waitingForSecondNumber = false;
      displayValue = number;
    } else {
      if (number === ".") {
        if (displayValue.includes(".")) {
          return;
        }
      }
      if (displayValue === "0") {
        displayValue = number;
      } else {
        displayValue += number;
      }
    }
    updateDisplay();
  }

  function handleOperator(op) {
    if (firstNumber === null) {
      firstNumber = displayValue;
      // 如果有操作符，也已经有了第二个参数. 又输入了操作符直接计算结果
    } else if (operator && !waitingForSecondNumber) {
      secondNumber = displayValue;
      displayValue = operate(
        parseFloat(firstNumber),
        operator,
        parseFloat(secondNumber)
      );
      firstNumber = displayValue;
    }
    operator = op;
    // 输入操作符后，设置为true
    waitingForSecondNumber = true;
    displayValue = `${firstNumber} ${operator}`;
    updateDisplay();
  }

  function handleEquals() {
    if (operator && firstNumber != null && !waitingForSecondNumber) {
      secondNumber = displayValue;
      displayValue = operate(
        parseFloat(firstNumber),
        operator,
        parseFloat(secondNumber)
      ).toString();
      firstNumber = null;
      secondNumber = null;
      operator = null;
    }
    updateDisplay();
  }

  function handleClear() {
    displayValue = "0";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
  }

  function handleBackspace() {
    // 如果显示的值是一个运算符（包含空格），则将其移除
    if (displayValue.includes(" ")) {
      displayValue = displayValue.split(" ")[0];
    } else {
      // 如果显示的值长度大于1，则移除最后一个字符
      if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
      } else {
        displayValue = "0"; // 如果显示的值长度为1，则重置为0
      }
    }
    updateDisplay();
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
    if (b === 0) {
      return "滚蛋, 不能除0";
    }
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

  function updateDisplay() {
    display.textContent = displayValue;
  }
});
