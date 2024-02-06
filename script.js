// UI interaction
// Fetch elements from HTML, assign variables
const buttons = document.querySelectorAll(".calculator-numpad > button")
const display = document.getElementById("calInput")
let displayData = ""
display.value = ""
let displayState = false
let result

// if displayState is true, clear data, set displayState to false.
function getState() {
  if (displayState) {
    display.value = ""
    displayData = ""
    displayState = false
  }
}
// Assign event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(
      `Current state: 
      displayState: ${displayState} 
      display.value: ${display.value} 
      displayData: ${displayData} 
      num1: ${num1} 
      num2: ${num2} 
      operator: ${operator}`
    )
    if (button.className === "btn-number") {
      getState()
      const buttonValue = button.getAttribute("data-num")
      display.value += buttonValue
      displayData = display.value
      console.log(displayData)
    } else if (button.className == "btn-operator") {
      getState()
      operator = button.getAttribute("data-num")
      if (num1 !== undefined) {
        num2 = Number(displayData)
        displayData = ""
        console.log("num2 input: " + num1)
      } else {
        num1 = Number(displayData)
        console.log("num1 input: " + num2)
        if (
          typeof num1 == "number" &&
          typeof num2 == "number" &&
          typeof operator == "string"
        ) {
          operate(num1, operator, num2)
          let result = operate(num1, operator, num2)
          display.value = result
        }
        displayState = true
      }
    } else if (button.className == "btn-equals") {
      if (num1 !== undefined) {
        num2 = Number(displayData)
        displayData = ""
        console.log("num2 input: " + num1)
      } else {
        num1 = Number(displayData)
        console.log("num1 input: " + num2)
      }
      if (
        typeof num1 == "number" &&
        typeof num2 == "number" &&
        typeof operator == "string"
      ) {
        console.log("Sending to operate:" + num1 + "" + operator + "" + num2)
        let result = operate(num1, operator, num2)
        display.value = result
      }
      displayState = true
    }
    console.log(
      `New state: 
      displayState: ${displayState} 
      display.value: ${display.value} 
      displayData: ${displayData} 
      num1: ${num1} 
      num2: ${num2} 
      operator: ${operator}`
    )
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
    input number into num1, if full input to num2
    input operator into operator.
  
  
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
let prevResult

// operate function to determine calculation input

function operate(num1, operator, num2) {
  console.log(`Operate start, received data:
  num1: ${num1}
  num2: ${num2}
  operator: ${operator}`)
  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    typeof operator !== "string"
  ) {
    console.log(`Invalid input type:
    num1 type: ${typeof num1}
    num2 type: ${typeof num2}
    operator type: ${typeof operator}`)
  }
  switch (operator) {
    case "+":
      return add(num1, num2)
    case "-":
      return subtract(num1, num2)
    case "*":
      return multiply(num1, num2)
    case "/":
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
