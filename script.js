// UI variables
const buttons = document.querySelectorAll(".calculator-numpad > button")
const display = document.getElementById("calInput")
let curNum
display.value = ""
let setState = false
let endCalc = false
let result
let prevResult
let num1
let num2
let operator = ""
let newOperator = ""

// if setState is true, clear data, set setState to false.
function getState() {
  if (setState) {
    display.value = ""
    setState = false
  }
}

// Assign event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Number button checks
    if (button.className === "btn-number") {
      getState()

      // If a calculation was concluded, clear data(used = or enter instead of consecutive calcs)
      if (endCalc) {
        num1 = num2 = prevResult = result = undefined
        operator = newOperator = ""
        endCalc = false
      }

      const buttonValue = button.getAttribute("data-num")
      curNum == undefined ? (curNum = buttonValue) : (curNum += buttonValue)
      display.value += buttonValue

      // Operator button checks
    } else if (button.className == "btn-operator") {
      getState()
      // Condition checks for state of calculator
      // If the operator is occupied, assign to newOperator. ( for consecutive operations )
      if (operator !== "") {
        newOperator = button.getAttribute("data-num")
      } else {
        operator = button.getAttribute("data-num")
      }

      if (prevResult !== undefined) {
        num1 = prevResult
      }
      // Number assignment trigger.
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
      // operate trigger if conditions are met
      if (
        typeof num1 == "number" &&
        typeof num2 == "number" &&
        typeof operator == "string"
      ) {
        result = operate(num1, operator, num2)
        display.value = result
        num1 = num2 = undefined
        if (newOperator !== "") {
          operator = newOperator
        }
      }
      setState = true

      // Equals button checks
    } else if (button.className == "btn-equals") {
      if (prevResult !== undefined) {
        num1 = prevResult
      }
      if (num1 !== undefined) {
        num2 = Number(curNum)
      } else {
        num1 = Number(curNum)
      }
      if (
        typeof num1 == "number" &&
        typeof num2 == "number" &&
        typeof operator == "string"
      ) {
        result = operate(num1, operator, num2)
        // Catch error in case of division by 0, if so, snarky remark and reset calculator
        if (result == "Err") {
          display.value = "BOOM!"
          num1 = num2 = undefined
          curNum = ""
          num1 = undefined
          num2 = undefined
          prevResult = undefined
          result = undefined
          operator = ""
          setState = true
        } else {
          display.value = result
          num1 = num2 = undefined
          curNum = ""
          num1 = undefined
          num2 = undefined
          prevResult = undefined
          operator = ""
          setState = true
          endCalc = true
          // Remove focus from input field,
          // if focus is regained assume new operation and clear display
          display.blur()
          display.addEventListener("focus", (e) => {
            display.value = ""
            e.currentTarget.removeEventListener("focus", e)
          })
        }
      }

      // clear checks
    } else if (button.className == "btn-clear big-btn") {
      display.value = ""
      curNum = ""
      num1 = undefined
      num2 = undefined
      operator = ""
      result = undefined
      prevResult = undefined
    }

    // dot checks
    else if (button.className == "btn-dot") {
      if (!curNum.includes(".")) {
        curNum += "."
        display.value += "."
      }

      // Del checks
    } else if (button.className == "btn-del") {
      curNum = curNum.substring(0, curNum.length - 1)
      display.value = curNum
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

  // Type check before operation
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
    case "%":
      return remainder(num1, num2)
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

// Remainder (Extra calculation just to make buttons fit nicely)

function remainder(num1, num2) {
  return Math.floor((num1 % num2) * 100) / 100
}

// divide

function divide(num1, num2) {
  if (num2 == 0) {
    return "Err"
  } else {
    return Math.floor((num1 / num2) * 100) / 100
  }
}

// Keyboard connection to calculator input field

display.addEventListener("keydown", (e) => {
  const regex = /^[0-9\/\*\-\+%.\b\r]+$/
  let inputValue = e.key

  const keyButtonMap = {
    Enter: ".btn-equals",
    Backspace: ".btn-del",
    ".": ".btn-dot",
  }

  // Handle special characters input assigned to corresponding UI button
  if (inputValue in keyButtonMap) {
    e.preventDefault()
    const buttonClass = keyButtonMap[inputValue]
    const targetButton = document.querySelector(buttonClass)
    if (targetButton) {
      targetButton.click()
    }
  } else {
    // Handle other keyboard inputs
    // Check if valid inputs, test against regex
    if (regex.test(inputValue)) {
      // Handle button clicks based on data-num attribute
      buttons.forEach((button) => {
        const dataNum = button.getAttribute("data-num")
        if (dataNum === inputValue) {
          e.preventDefault()
          button.click()
        }
      })
      // if test failed, remove entry
    } else {
      inputValue = inputValue.slice(0, -1)
    }
  }
})
