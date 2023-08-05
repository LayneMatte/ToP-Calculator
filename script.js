
// initialize variables to be used as running totals 
let num1 = 0;
let num2 = 0; 
let operator = ''; 
let solution = '';

// select .button class 
let numberButton = document.querySelectorAll('.button');
// iterate over buttons and apply update Display function (purely for click)
let click = numberButton.forEach(div => div.addEventListener('click',updateDisplay))
// listen for keydown to apply buttonPress function
let keydown = window.addEventListener('keydown',buttonPress)
//  select .numbers class to be used for modifying number display
let display = document.querySelector('.numbers')
// for displaying active formula in display box 
let runningFormula = document.querySelector('.running-formula')

// to store display number in num1 variable for KEYDOWN
function getNum1Keydown () {
            // checks to see if active display is NaN or empty before moving on 
            if (isNaN(display.textContent) === true|| display.textContent === '') {return}
            operator = event.key;
            num1 = parseFloat(display.textContent);
            // erases display text 
            display.textContent = '';
            // adds to active running formula 
            runningFormula.textContent = `${num1} ${operator}`
}
// applies keypress functionality 
function buttonPress (event) {
    tempNum = parseFloat(display.textContent)
    switch (event.key) {
        case '1':
            display.textContent += '1';
            break
        case '2':
            display.textContent += '2';
            break
        case '3':
            display.textContent += '3';
            break
        case '4':
            display.textContent += '4';
            break
        case '5':
            display.textContent += '5';
            break
        case '6':
            display.textContent += '6';
            break
        case '7':
            display.textContent += '7';
            break
        case '8':
            display.textContent += '8';
            break
        case '9':
            display.textContent += '9';
            break
        case '0':
            display.textContent += '0';
            break
        case '.':
            console.log(Number.isInteger(parseFloat(display.textContent)))
            if (event.code === '.' && Number.isInteger(tempNum) === true) {
                return display.textContent = `${tempNum}.`
            } else if (event.code === '.' && Number.isInteger(tempNum) === false) { return }
            break
        case 'Backspace':
            if (event.code === 'Backspace' && display.textContent !== '') {
                tempNum = 0
                return backspace() 
            }
                else if (event.code === 'Backspace' && display.textContent === '') {return tempNum = 0}
            break
        case '/':
            event.preventDefault();
            getNum1Keydown()
            break
        case '*':
            event.preventDefault();
            getNum1Keydown()
            break
        case '+':
            event.preventDefault();
            getNum1Keydown()
            break
        case '-':
            event.preventDefault();
            getNum1Keydown()
            break
        case 'Enter':
            equal();
            break
    }
}
// lets user remove last inputted number 
function backspace () {
    // turn display into array 
    let displayNumbers = Array.from(display.textContent)
    // remove last number
    displayNumbers.pop()
    // turn back into a string
    let newDisplayNumbers = displayNumbers.join('')
    // turn into float
    parsed = parseFloat(newDisplayNumbers)
    // checks to make sure a number is in display 
    if (Number.isNaN(parsed) === true) {
        return display.textContent = ''
    }
    display.textContent = parsed
}

tempNum = 0;
// main function to update display 
function updateDisplay (e) {
    let num = e.target.id;
    // tempNum must update twice to avoid issues with floating point placement
    tempNum = parseFloat(display.textContent)
    // erases display text 
    if (num === 'clear') {
        display.textContent = ''
        runningFormula.textContent = ''
        tempNum = 0 
        num1 = 0 
        num2 = 0
        return 
    }
    // adds backspace function and check to see if a number is present 
    if (num === 'backspace' && display.textContent !== '') {
        return backspace(), tempNum = 0
    }  else if (num === 'backspace' && display.textContent === '') {
        tempNum = 0
        return 
    }
    // adds period to create floating point and prevents more than 1 from being inputted 
    if (num === '.' && Number.isInteger(tempNum) === true) {
        display.textContent = `${tempNum}.`
        return 
    }  else if (num === '.' && Number.isInteger(tempNum) === false) {return }
    // adds percent funcitonality and checks if display is empty to not apply 
    if (num === '%' && display.textContent !== '') {
        display.textContent = display.textContent/100
        return
    }  else if (num === '%' && display.textContent === '') {return}
    // positive/negative functionality and checks if display is empty to not apply 
    if (num === '+/-' && display.textContent !== '') {return display.textContent = display.textContent * -1}
        else if (num === '+/-' && display.textContent === '') {return}
    // purely to keep equal sign from being input into display field 
    if (num === '=') {return}
    // concatenates numbers/periods 
    display.textContent += num
    // parses display text into floating point to be used in operations 
    tempNum = parseFloat(display.textContent)   
}

// selects operator class 
let operatorButton = document.querySelectorAll('div.operator')
// iterates over each operator button and applies the getNum1 function for CLICK specifically 
let active = operatorButton.forEach(div => div.addEventListener('click', getNum1Click))

// function to store current display text into num1 variable and apply current num1 and operator to running formula 
function getNum1Click (e) {
    // checks to make sure a number is in the display and its not empty 
    if (isNaN(display.textContent) === true|| display.textContent === '') {return}
    operator = e.target.id;
    num1 = parseFloat(display.textContent);
    display.textContent = '';
    // updates running total 
    runningFormula.textContent = `${num1} ${operator}`
}

// selects equal button 
let equalButton = document.querySelector('div.equal')
// applies click functionality 
let equals = equalButton.addEventListener('click', equal)
// function to operate 
function equal () {
    // checks to make sure num1 is a number before operating 
if (isNaN(num1) === true) {return}
// stores current display number in num2 
num2 = parseFloat(display.textContent);
// checks if running formula already has active equal sign in it and returns if so 
if (runningFormula.textContent.includes('=') === true || Number.isNaN(runningFormula.textContent) === true || display.textContent === '') {return}
else {runningFormula.textContent += ` ${num2} = `}
// operates 
operate(operator)
}
// operates num1 and num2 and creates solution 
function operate (operator) {
    switch (operator) {
        case '+':
            solution = num1 + num2
            display.textContent = solution;
            break;
        case '-':
            solution = num1 - num2
            display.textContent = solution;
            break;
        case '/':
            if (num2 === 0) {
                alert('Cannot Divide By 0')
                display.textContent = ''
                runningFormula.textContent = ''
                return
            }
            solution = num1 / num2
            display.textContent = solution;
            break;
        case '*':
            solution = num1 * num2
            display.textContent = solution;
            break;
    }   
}



