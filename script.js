let firstNumber = 0;
let secondNumber = 0;
let total = 0;

const buttons = document.querySelectorAll("button");
const displayTotal = document.querySelector(".total");
const displaySteps = document.querySelector(".steps");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let isNumber = button.classList.contains("number");
        if(isNumber) {
            if(total) {
                displayTotal.textContent = 0;
                total = 0;
            }
            updateDisplay(button.value);
        } else {
            const operator = button.value;
            operate(button, operator);
        }
    })
})


function operate(button, operator) {
    if(button.classList.contains("oneNumber")) {
        displayTotal.textContent = operateOneNumber(displayTotal.textContent, operator);
    } else if(button.classList.contains("twoNumber") && total == 0){
        updateNumber(displayTotal.textContent);
        displaySteps.textContent = `${firstNumber} ${operator}`;

        total = operateTwoNumbers(firstNumber, operator, secondNumber);
    }
}


function updateNumber(number) {
    return firstNumber ? secondNumber = number : firstNumber = number;
}


function updateDisplay(number) {
    if(displayTotal.textContent == 0) {
        if(number != 0) {
            displayTotal.textContent = number; 
        }
    } else {
        if(displayTotal.textContent.length < 10) {
            displayTotal.textContent = 
                `${displayTotal.textContent}${number}`;
        } else return
    }
}


function operateTwoNumbers(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
        case "%":
            return modulo(firstNumber, secondNumber);
    }
}


function operateOneNumber(firstNumber, operator) {
    switch (operator) {
        case "1/x":
            return oneDividedBy(firstNumber);
        case "pow":
            return power(firstNumber);
        case "sqrt":
            return squareRoot(firstNumber);
        case "+/-":
            return changeOperator(firstNumber);
        case ".":
            if(displayTotal.textContent.includes(".")) return displayTotal.textContent;
            return addDecimal(firstNumber)
    }
} 


function clear(operator) {
    switch (operator) {
        case "CE":
            return ;
        case "C":
            return ;
        case "bsp":
            return ;
    }
}


function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };
function modulo(a, b) { return a % b };
function oneDividedBy(a) { return 1 / a };
function power(a) { return a ** 2 };
function squareRoot(a) { return Math.sqrt(a) };
function changeOperator(a) { return a !== 0 ? a * (-1) : a};
function addDecimal(a) { return `${a}.`}