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

function percentage(a) {
    return a / 100;
}

function plusminus(a) {
    return -a;
}

const numBtns = document.querySelectorAll('.num');
const decimalBtn = document.querySelector('.decimal');
const plusMinBtn = document.querySelector('.sign');
const divideBtn = document.querySelector('.divide');
const multiplyBtn = document.querySelector('.multiply');
const subtractBtn = document.querySelector('.subtract');
const addBtn = document.querySelector('.add');
const equalBtn = document.querySelector('.equal');
const percentageBtn = document.querySelector('.percent');
const backspaceBtn = document.querySelector('.backspace');
const clearBtn = document.querySelector('.clear');

let processing = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";

let displayValue = "";
let mode = "";

function updateDisplay() {
    document.querySelector(".processing").textContent = displayValue || "0";
}

function appendValue(value) {
    displayValue += value;
    updateDisplay();
}

function clearDisplay() {
    displayValue = "";
    updateDisplay();
}

// function calculateResult() {

// }

numBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    processing = btn.textContent;
    appendValue(processing);
  });
});
