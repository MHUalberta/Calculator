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

function operate(operator, a, b) {
    if (operator === "+") 
        return add(a, b);

    else if (operator === "-") 
        return subtract(a, b);

    else if (operator === "*") 
        return multiply(a, b);

    else if (operator === "/") 
        return divide(a, b);
}

function addToDisplay() {
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

function addEventListeners() {
    const screenButtons = document.querySelectorAll("button.onscreen");
    screenButtons.forEach((button) => button.addEventListener("click", addToDisplay))

    const eraseButtons = document.querySelectorAll("button.erase");
    eraseButtons.forEach((button) => button.addEventListener("click", erase))
}

const display = document.getElementById("screen");
addEventListeners();

