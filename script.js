// UI interaction
// Fetch elements from HTML, assign variables
const buttons = document.querySelectorAll(".calculator-numpad > button")
const display = document.getElementById("calInput")
display.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    displayData = display.value
    console.log(displayData)
  }
})
let displayData = ""

// Assign event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    //Logic to add to each button for now alert for testing
    const buttonValue = button.getAttribute("data-num")
    display.value += buttonValue
    let displayData = display.value
    console.log(displayData)
  })
})

// TODO - displayData processing
// Pseudo code
/* 

When a number button is pressed
  update displayData and proceed with accepting input

create a new function for when a operator button is pressed
  check for any invalid inputs (anything that is not a number or operators)
    if invalid, update input field to say "invalid input"
      clear text as soon as another button or keyboard stroke is pressed
    add number and operator to an array "operationArray"
  
  
  clear the input field, and displayData, and repeat.
    create event listeners to listen for + - * / keyups and run this function

create a function for when CLEAR is pressed
  remove all data from numData array
  remove all data from operatorData array
  set value of displayData = ""
  clear input text field 

create a function for when enter is pressed, this should start calculation
  all numbers and operators should already be of correct types
  use reduce() to itterate through each operation, doing one operation at a time
  
  create event listeners to listen for ENTER on keyboard, and run this function
*/
// operation variables
let num1
let num2
let operator = ""

// operate function to determine calculation input

function operate(operator, num1, num2) {
  if (
    typeof operator !== "string" ||
    typeof num1 !== "number" ||
    typeof num2 !== "number"
  ) {
    return "operate: Invalid input type"
  }
  switch (operator) {
    case "plus":
      return add(num1, num2)
    case "minus":
      return subtract(num1, num2)
    case "asterisk":
      return multiply(num1, num2)
    case "slash":
      return divide(num1, num2)
    default:
      return "operate: operator not found"
  }
}
/* Use cases the calculator should have */
// add

function add(num1, num2) {
  return num1 + num2
}

// subtract

function subtract(num1, num2) {
  return num1 - num2
}

// multiply

function multiply(num1, num2) {
  return num1 * num2
}

// divide

function divide(num1, num2) {
  return num1 / num2
}
