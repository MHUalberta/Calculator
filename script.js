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
        throw "Math Error";
    }
    return a / b;
}

function operate(operator, a, b) {
    a = +a;
    b = +b;
    
    if (operator === "\u002B") 
        return add(a, b);

    else if (operator === "\u2212") 
        return subtract(a, b);

    else if (operator === "\u00D7") 
        return multiply(a, b);

    else if (operator === "\u00F7") 
        return divide(a, b);
}

function addToDisplay() {
    if (display.textContent.includes("Error")) {
        display.textContent = '';
    }
    display.textContent += this.textContent;
}

function erase() {
    if (this.textContent === 'DEL') {
        display.textContent = display.textContent.slice(0, -1);
    }
    else if (this.textContent === 'C') {
        display.textContent = '';
    }
}

function calculateOnePair() {
    let operand1 = display.textContent.match(/(\d+(\.\d+)?)|\u03C0|Ans/)[0];
    display.textContent = display.textContent.replace(/(\d+(\.\d+)?)|\u03C0|Ans/, '');
    operand1 === "\u03C0" ? operand1 = Math.PI: operand1 = operand1;
    operand1 === "Ans" ? operand1 = storedAns: operand1 = operand1;

    const operator = display.textContent.match(/./)[0];
    display.textContent = display.textContent.replace(/./, '');

    let operand2 = display.textContent.match(/(\d+(\.\d+)?)|\u03C0|Ans/)[0];
    display.textContent = display.textContent.replace(/(\d+(\.\d+)?)|\u03C0|Ans/, '');
    operand2 === "\u03C0" ? operand2 = Math.PI: operand2 = operand2;
    operand2 === "Ans" ? operand2 = storedAns: operand2 = operand2;

    const newOperand = operate(operator, operand1, operand2);
    display.textContent = newOperand + display.textContent;
}

function calculateDisplay() {
    try {
        if (!isNaN(+display.textContent)) {     //If only one operand.
            throw new Error();
        }
        while (isNaN(+display.textContent)) {   //Any operator present creates a NaN and means there is still operations left.
            calculateOnePair();
        }
        storedAns = display.textContent;
    }
    catch(e) {
        if (e === "Math Error") {
            display.textContent = e;
        }
        else {
            display.textContent = "Syntax Error";
        }
    }
}

function addEventListeners() {
    const screenButtons = document.querySelectorAll("button.onscreen");
    screenButtons.forEach((button) => button.addEventListener("click", addToDisplay));

    const eraseButtons = document.querySelectorAll("button.erase");
    eraseButtons.forEach((button) => button.addEventListener("click", erase));

    const calculateButton = document.querySelector("button.calculate");
    calculateButton.addEventListener("click", calculateDisplay);
}

const display = document.getElementById("screen");
let storedAns;
addEventListeners();

