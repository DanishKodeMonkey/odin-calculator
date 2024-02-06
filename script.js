// UI variables
const buttons = document.querySelectorAll(".calculator-numpad > button")
const display = document.getElementById("calInput")
let curNum
let displayData
display.value = ""
let setState = false
let result
let prevResult
const invType = /[a-zA-Z]+/g

//Operation variables
let num1
let num2
let operator = ""

// if setState is true, clear data, set setState to false.
function getState() {
  if (setState) {
    display.value = ""
    displayData = 0
    setState = false
  }
}

//Function for later keyboard implementation.
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
    //Debug start state
    console.log(
      `Start state: 

      button clicked: ${e.target.className}
      
      setState: ${setState} 
      display.value: ${display.value} 
      displayData: ${displayData}
      curNum: ${curNum} 
      num1: ${num1} 
      num2: ${num2} 
      operator: ${operator}
      result: ${result}
      previous result: ${prevResult}`
    )
    //end

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
      operator = button.getAttribute("data-num")
      if (prevResult !== undefined) {
        num1 = prevResult
        //Debug operator start
        console.log(`PrevResult state: 

      prevResult caught! is ${prevResult}

      button clicked: ${e.target.className}
      
      setState: ${setState} 
      display.value: ${display.value} 
      displayData: ${displayData}
      curNum: ${curNum} 
      num1: ${num1} 
      num2: ${num2} 
      operator: ${operator}
      result: ${result}
      previous result: ${prevResult}`)
        //end
      }
      if (curNum !== "") {
        if (num1 !== undefined) {
          console.log(
            `mid state: 
    
          button clicked: ${e.target.className}
          
          setState: ${setState} 
          display.value: ${display.value} 
          displayData: ${displayData}
          curNum: ${curNum} 
          num1: ${num1} 
          num2: ${num2} 
          operator: ${operator}
          result: ${result}
          previous result: ${prevResult}`
          )
          //end
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
        display.value = result
        num1 = num2 = undefined
        curNum = ""
      }

      //clear checks
    } else if (button.className == "btn-clear") {
      displayData = undefined
      display.value = ""
      displayData = undefined
      curNum = 0
      num1 = undefined
      num2 = undefined
      operator = ""
      result = undefined
      prevResult = undefined
    }

    prevResult = result
    //debug new state
    console.log(
      `New state: 
      setState: ${setState} 
      display.value: ${display.value} 
      displayData: ${displayData}
      curNum: ${curNum} 
      num1: ${num1} 
      num2: ${num2} 
      operator: ${operator}
      result: ${result}
      previous result: ${prevResult}`
    )
    //end
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
const OPT = ["+", "-", "*", "/"]

console.log(
  `Operate state: 
  setState: ${setState} 
  display.value: ${display.value} 
  displayData: ${displayData}
  curNum: ${curNum} 
  num1: ${num1} 
  num2: ${num2} 
  operator: ${operator}
  result: ${result}
  previous result: ${prevResult}`
)

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
  return Math.floor((num1 + num2) * 100) / 100
}
