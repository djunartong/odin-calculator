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

let inputOperand = 0;
let processedOperand = 0;
let operator = "";

let displayValue = "";
let mode = "";
let processing = false;
let isDecimal = false;
let justEvaluated = false;

// Function to format decimals to 3 decimal places
function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num;
    }

    return parseFloat(num.toFixed(3));
}

function updateDisplay() {
    document.querySelector(".num-display").textContent = displayValue || "0";
}

function appendValue(value) {
    displayValue += value;
    updateDisplay();
}

function clearDisplay() {
    displayValue = "";
    updateDisplay();
}

 function operate() {
    if (mode === "divide") { 
        if (inputOperand === 0) {
            displayValue = "ERR";
            updateDisplay();
            processedOperand = 0;
            inputOperand = 0;
            processing = false;
            return;
        } else {
            displayValue = formatNumber(divide(processedOperand, inputOperand)).toString(); 
        }
    } else if (mode === "multiply") { 
        displayValue = formatNumber(multiply(processedOperand, inputOperand)).toString();
    } else if (mode === "subtract") { 
        displayValue = formatNumber(subtract(processedOperand, inputOperand)).toString(); 
    } else if (mode === "add") { 
        displayValue = formatNumber(add(processedOperand, inputOperand)).toString(); 
    } else if (mode === "percent") { 
        displayValue = formatNumber(percentage(inputOperand)).toString(); 
    }

    processedOperand = parseFloat(displayValue);
    isDecimal = displayValue.includes("."); // Check for decimal state
}

document.addEventListener("DOMContentLoaded", () => {

    updateDisplay();

    numBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (justEvaluated) {
                clearDisplay();
                justEvaluated = false;
            }
           
            if (displayValue === "ERR") {
                clearDisplay();
                processing = false;
                isDecimal = false;
            }

            if (!processing) {
                appendValue(btn.textContent);
                inputOperand = parseFloat(displayValue);
            } else if (processing && isDecimal) {
                appendValue(btn.textContent);
                inputOperand = parseFloat(displayValue);
            } else {
                clearDisplay();
                isDecimal = false;
                appendValue(btn.textContent);
                inputOperand = parseFloat(displayValue);
            }  
        });
    });

    divideBtn.addEventListener("click", () => {
        isDecimal = false;
        if (!processing) {
            processing = true;
            processedOperand = parseFloat(displayValue);
            mode = "divide";
        } else {
            operate();
            mode = "divide";
        }
    });

    multiplyBtn.addEventListener("click", () => {
        isDecimal = false;
        if (!processing) {
            processing = true;
            processedOperand = parseFloat(displayValue);
            mode = "multiply";
        } else {
            operate();
            mode = "multiply";
        }
    });

    subtractBtn.addEventListener("click", () => {
        isDecimal = false;
        if (!processing) {
            processing = true;
            processedOperand = parseFloat(displayValue);
            mode = "subtract";
        } else {
            operate();
            mode = "subtract";
        }
    });

    addBtn.addEventListener("click", () => {
        isDecimal = false;
        if (!processing) {
            processing = true;
            processedOperand = parseFloat(displayValue);
            mode = "add";
        } else {
            operate();
            mode = "add";
        }
    });

    percentageBtn.addEventListener("click", () => {
        isDecimal = false;
        mode = "percent";
        inputOperand = parseFloat(displayValue);
        operate();
        processedOperand = parseFloat(displayValue);
        updateDisplay();
    });

    decimalBtn.addEventListener("click", () => {
        if(justEvaluated) {
            clearDisplay();
            displayValue = "0.";
            isDecimal = true;
            justEvaluated = false;
            updateDisplay();
            return;
        }

        if(!isDecimal) {
            isDecimal = true;
            if (displayValue === "" || displayValue === "ERR") {
                clearDisplay();
                appendValue("0.");
            } else {
                appendValue(".");
            }
        }
    });

    plusMinBtn.addEventListener("click", () => {
        if (displayValue === "" || displayValue === "ERR") return;

        inputOperand = -parseFloat(displayValue);
        displayValue = inputOperand.toString();
        updateDisplay();
    });

    equalBtn.addEventListener("click", () => {
        isDecimal = false;

        if (processing) {
            operate();
            processedOperand = parseFloat(displayValue);
        }

        inputOperand = 0;
        processing = false;
        mode = "";
        justEvaluated = true;
        updateDisplay();

    });

    backspaceBtn.addEventListener("click", () => {
        displayValue = displayValue.slice(0, -1);

        if(displayValue === "") {
            inputOperand = 0;
            updateDisplay();
            return;
        }

        inputOperand = parseFloat(displayValue);
        updateDisplay();
    });

    clearBtn.addEventListener("click", () => {
        isDecimal = false;
        processing = false;
        processedOperand = 0;
        inputOperand = 0;
        clearDisplay();
    });
});