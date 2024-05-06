let firstNumber = 0;
let secondNumber = 0;
let rollingTotal = 0;
let operator;
let nextOperator;
let displayCleared = false;

const oneNumberOperators = ["1/x", "pow", "sqrt"];

const buttons = document.querySelectorAll("button");
const displayTotal = document.querySelector(".total");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let isNumber = button.classList.contains("number");
        if(isNumber) {
            if(operator == "equal") {
                operator = "C";
                clear(operator);
            }

            if(!displayCleared) {
                displayTotal.textContent = 0;
                displayCleared = true;
            }

            updateDisplay(button.value);
        } else {
            if(button.classList.contains("clear")) {
                displayCleared = true;
                clear(button.value);
            } 
            else if(button.classList.contains("oneNumber")) {
                if(operator == "equal") {
                    operator = 0;
                }

                displayTotal.textContent = 
                    operateOneNumber(displayTotal.textContent, button.value);

                displayCleared = true;
            }
            else if(button.classList.contains("twoNumber") || button.getAttribute("id") == "equal") {
                if(!firstNumber) {
                    updateNumber(displayTotal.textContent);
                    operator = button.value;
                    displayCleared = false;

                    if(button.getAttribute("id") == "equal") {
                        if(displayTotal.textContent[displayTotal.textContent.length - 1] == ".") {
                            let updatedString = displayTotal.textContent.slice(0, displayTotal.textContent.length - 1);
                            displayTotal.textContent = updatedString;
                            console.log("testtt");
                                
                        }
                    }
                    console.log("t1")
                } else {
                    if(displayCleared) {
                        updateNumber(displayTotal.textContent);
                        firstNumber = operateTwoNumbers(firstNumber, operator, secondNumber);
                        displayCleared = false;
                        operator = button.value;
                        secondNumber = 0;
                        displayTotal.textContent = firstNumber;

                        if(button.getAttribute("id") == "equal") {
                            firstNumber = 0;
                        }
                        console.log("t2");
                    } else {
                        operator = button.value;
                        console.log("t3");
                    } 
                }
            }
            
            console.log(firstNumber, operator, secondNumber);
        }
    })
})


function operate(button, operator) {
    
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


function clear(clearOperator) {
    switch (clearOperator) {
        case "CE":
            displayTotal.textContent = 0;
            break;
        case "C":
            displayTotal.textContent = 0;
            firstNumber = 0;
            secondNumber = 0;
            operator = "";
            break;
        case "bsp":
            if(displayTotal.textContent.length > 1) {
                if(displayTotal.textContent.length == 2 && displayTotal.textContent.includes("-")) {
                    displayTotal.textContent = 0;
                } else {
                    const newValue = displayTotal.textContent.slice(0, -1);
                    displayTotal.textContent = newValue;    
                }
            } else if(displayTotal.textContent.length == 1 && displayTotal.textContent != 0 ) {
                displayTotal.textContent = 0;
            }
            break;
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


function toPrecise(result) {
    return String(result).length > 10 ? result.toPrecision(6) : result;
}


function add(a, b) { return toPrecise(+(a + b)) };
function subtract(a, b) { return toPrecise(+(a - b)) };
function multiply(a, b) { return toPrecise(a * b) };
function divide(a, b) { return toPrecise(+(a / b)) };
function modulo(a, b) { return toPrecise(+(a % b)) };
function oneDividedBy(a) { return toPrecise(+(1 / a)) };
function power(a) { return toPrecise(+(a ** 2)) };
function squareRoot(a) { return toPrecise(+(Math.sqrt(a))) };
function changeOperator(a) { return a !== 0 ? toPrecise(+(a * (-1))) : toPrecise(+(a)) };
function addDecimal(a) { return `${a}.`}