// UI variables
const buttons = document.querySelectorAll(".calculator-numpad > button")
const display = document.getElementById("calInput")
let curNum
let displayData
display.value = ""
let setState = false
let result
let prevResult
//RegEx for keyboard implementation. TODO
const invType = /[a-zA-Z]+/g

//Operation variables
let num1
let num2
let operator = ""
let newOperator = ""

// if setState is true, clear data, set setState to false.
function getState() {
  if (setState) {
    display.value = ""
    displayData = 0
    setState = false
  }
}

//Function for later keyboard implementation. TODO
// Idea is to use checkNum for any keyboard strokes, if it's not a number, or operator refuse it.
function checkNum(num) {
  if (displayData == invType) {
    console.log(`Type: ${typeof num}`)
    display.value = "Invalid char"
    setState = true
  }
}
// Assign event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    //Number checks
    if (button.className === "btn-number") {
      getState()
      const buttonValue = button.getAttribute("data-num")
      curNum == undefined ? (curNum = buttonValue) : (curNum += buttonValue)
      display.value += buttonValue
      displayData = display.value

      // Operator checks
    } else if (button.className == "btn-operator") {
      getState()
      if (operator !== "") {
        newOperator = button.getAttribute("data-num")
      } else {
        operator = button.getAttribute("data-num")
      }

      console.log(`Operator status:
      operator: ${operator}
      newOperator: ${newOperator}`)
      if (prevResult !== undefined) {
        num1 = prevResult
      }
      if (curNum !== "") {
        if (num1 !== undefined) {
          num2 = Number(curNum)
          console.log("num2 input: " + num2)
          curNum = ""
        } else {
          num1 = Number(curNum)
          console.log("num1 input: " + num1)
          curNum = ""
        }
      }
      if (
        typeof num1 == "number" &&
        typeof num2 == "number" &&
        typeof operator == "string"
      ) {
        operate(num1, operator, num2)
        result = operate(num1, operator, num2)
        display.value = result
        num1 = num2 = undefined
        if (newOperator !== "") {
          operator = newOperator
        }
        console.log(`Operator status:
      operator: ${operator}
      newOperator: ${newOperator}`)
      }
      setState = true

      //Equals checks
    } else if (button.className == "btn-equals") {
      if (prevResult !== undefined) {
        num1 = prevResult
      }
      if (num1 !== undefined) {
        num2 = Number(curNum)
        displayData = ""
      } else {
        num1 = Number(curNum)
      }
      if (
        typeof num1 == "number" &&
        typeof num2 == "number" &&
        typeof operator == "string"
      ) {
        console.log("Sending to operate:" + num1 + "" + operator + "" + num2)
        result = operate(num1, operator, num2)
        if (result == "Err") {
          display.value = "BOOM!"
          num1 = num2 = undefined
          curNum = ""
          num1 = undefined
          num2 = undefined
          prevResult = undefined
          result = undefined
          operator = ""
        } else {
          display.value = result
          num1 = num2 = undefined
          curNum = ""
          num1 = undefined
          num2 = undefined
          prevResult = undefined
          operator = ""
        }
      }

      //clear checks
    } else if (button.className == "btn-clear big-btn") {
      display.value = ""
      displayData = undefined
      curNum = ""
      num1 = undefined
      num2 = undefined
      operator = ""
      result = undefined
      prevResult = undefined
    }

    prevResult = result
  })
})

const OPT = ["+", "-", "*", "/"]

// operate function to determine calculation input

function operate(num1, operator, num2) {
  console.log(`Operate start, received data:
  num1: ${num1}
  num2: ${num2}
  operator: ${operator}`)

  //Typecheck before operation
  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    OPT.includes(operator) !== true
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
  return Math.floor((num1 + num2) * 100) / 100
}

// subtract

function subtract(num1, num2) {
  return Math.floor((num1 - num2) * 100) / 100
}

// multiply

function multiply(num1, num2) {
  return Math.floor(num1 * num2 * 100) / 100
}

// divide

function divide(num1, num2) {
  if (num2 == 0) {
    return "Err"
  } else {
    return Math.floor((num1 / num2) * 100) / 100
  }
}
