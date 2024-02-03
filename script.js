//operation variables
let num1
let num2
let operator = ""

//operate function to determine calculation input

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
