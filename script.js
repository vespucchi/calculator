function add(a, b) { return a + b };
function subtract(a, b) { return a - b };
function multiply(a, b) { return a * b };
function divide(a, b) { return a / b };
function modulo(a, b) { return a % b };
function oneDividedBy(a) { return 1 / a };
function power(a) { return a ** 2 };
function squareRoot(a) { return Math.sqrt(a) };
function changeOperator(a) { return a !== 0 ? a * (-1) : a};


let firstNumber = 0;
let operator;
let secondNumber;
let total = 0;

let buttons = document.querySelectorAll(".button");
let displayTotal = document.querySelector(".total");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let isNumber = button.classList.contains("number");
        if(isNumber) {
            if(button.textContent != 0) {
                if(displayTotal.textContent == 0) displayTotal.textContent = button.textContent;
                else if(displayTotal.textContent.length < 10) displayTotal.textContent= `${displayTotal.textContent}${button.textContent}`;
            } 
        }
        console.log(button.textContent);
    })
})


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
        case "+-":
            return changeOperator(firstNumber);
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