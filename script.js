let firstNumber = 0;
let secondNumber = 0;
let rollingTotal = 0;
let operator;
let nextOperator;
let displayCleared = false;

const oneNumberOperators = ["1/x", "pow", "sqrt"];

const buttons = document.querySelectorAll("button");
const displayTotal = document.querySelector(".total");
const displaySteps = document.querySelector(".steps");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let isNumber = button.classList.contains("number");
        if(isNumber) {
            if(!displayCleared) {
                displayTotal.textContent = 0;
                displayCleared = true;
            }
            updateDisplay(button.value);
        } else {
            if(button.classList.contains("clear")) {
                clear(button.value);
                displayCleared = true;
            } 
            else if(button.classList.contains("oneNumber")) {
                displayTotal.textContent = 
                operateOneNumber(displayTotal.textContent, button.value);
                displayCleared = true;
            }
            else if(button.classList.contains("twoNumber")) {
                if(!firstNumber) {
                    updateNumber(displayTotal.textContent);
                    operator = button.value;
                    displayCleared = false;
                    console.log(firstNumber, operator, secondNumber, displayCleared);
                } else {
                    if(displayCleared) {
                        updateNumber(displayTotal.textContent);
                        console.log(firstNumber, operator, secondNumber);
                        firstNumber = operateTwoNumbers(firstNumber, operator, secondNumber);
                        displayCleared = false;
                        operator = button.value;
                        secondNumber = 0;
                        displayTotal.textContent = firstNumber;
                        console.log(firstNumber, operator, secondNumber, displayCleared);
                    } else {
                        operator = button.value;
                        console.log(firstNumber, operator, secondNumber, displayCleared);
                    } 
                }
            }            
        }
    })
})


function operate(button, operator) {
    
}


function updateNumber(number) {
    return firstNumber ? secondNumber = number : firstNumber = number;
}


function updateStepsDisplay(number, operator) {
    const display = document.querySelector(".steps");
    
    if(oneNumberOperators.includes(operator)) {
        if(operator == "1/x") display.textContent = `1 / ${number} =`;
        else display.textContent = `${operator}(${number}) =`;
    } else {
        display.textContent = `${number} ${operator}`;
    }
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


function clear(operator) {
    switch (operator) {
        case "CE":
            displayTotal.textContent = 0;
        case "C":
            displayTotal.textContent = 0;
            firstNumber = 0;
            secondNumber = 0;
            operator = "";
        case "bsp":
            if(displayTotal.textContent.length > 1) {
                const newValue = displayTotal.textContent.slice(0, -1);
                displayTotal.textContent = newValue;
            } else if(displayTotal.textContent.length == 1 && displayTotal.textContent != 0) {
                displayTotal.textContent = 0;
            }
    }
}


function operateTwoNumbers(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return add(+firstNumber, +secondNumber);
        case "-":
            return subtract(+firstNumber, +secondNumber);
        case "*":
            return multiply(+firstNumber, +secondNumber);
        case "/":
            return divide(+firstNumber, +secondNumber);
        case "%":
            return modulo(+firstNumber, +secondNumber);
    }
}


function operateOneNumber(currentDisplayNumber, operator) {
    switch (operator) {
        case "1/x":
            return oneDividedBy(+currentDisplayNumber);
        case "pow":
            return power(+currentDisplayNumber);
        case "sqrt":
            return squareRoot(+currentDisplayNumber);
        case "+/-":
            return changeOperator(+currentDisplayNumber);
        case ".":
            if(displayTotal.textContent.includes(".")) return displayTotal.textContent;
            return addDecimal(currentDisplayNumber)
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