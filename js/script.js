// ========================= VARIABLES =========================

// variable screen, where displaying number, mathematical operators and result
const screen = document.querySelector(".screen");

// variable firstNumber, secondNumber contains first and second number of 
// mathematical operation
let firstNumber = 0;
let secondNumber = 0;
let result = 0;

let firstNumberStr;
let secondNumberStr;
let mathSymbolStr;
let previusMathSymbolStr;

// variable tempScreen, contain numbers and mathematical operator that displaying on screen
let tempScreen = "0";


// add event listener to whole section with class "buttons"
document.querySelector(".buttons").addEventListener("click", function(event){
  // debugger;
  // filtering only element with tag name "BUTTON"
  if (event.target.tagName === "BUTTON") {
    // when button is clicked, call the function clickButton()
    clickButton(event.target.innerText);
  }
});

// ========================= FUNCTIONS =========================

function clickButton (btnStr) {
  
  // check if btnStr NaN or number
  if (isNaN(btnStr)) {
    // if is symbol call function handleSymbol()
    handleSymbol(btnStr);
  } else {
    // if is number call function handleNumber()
    handleNumber(btnStr);
  }

  screen.innerText = tempScreen;
}

function handleSymbol (symbolStr) {
  
  if (tempScreen === "0") {
    return;
  }

  switch (symbolStr) {
    case "←":
      handleBack();
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMathSymbol(symbolStr);
      break;
    case "=":
      handleEqual();
      break;
    case "C":
      reset();
      break;
  }

}

function reset () {
  firstNumber = 0;
  secondNumber = 0;
  result = 0;
  firstNumberStr = null;
  secondNumberStr = null;
  mathSymbolStr = null;
  previusMathSymbolStr = null;
  tempScreen = "0";
}

function handleEqual () {
    
    if (!mathSymbolStr) {
      return;
    }

    result = doMath(mathSymbolStr);
    tempScreen = result;

    // nema više secondNumberStr
    secondNumberStr = null;
    secondNumber = 0;
    // nema više mathSymbolStr
    mathSymbolStr = null;
    
    firstNumber = result;
    firstNumberStr = result.toString();
    
}

function handleMathSymbol (symbol) {
  
  if (!previusMathSymbolStr) {
    
    if (!mathSymbolStr) {
      mathSymbolStr = symbol;
      tempScreen += mathSymbolStr;
    } else {
      previusMathSymbolStr = mathSymbolStr;
      mathSymbolStr = symbol;
      result = doMath(previusMathSymbolStr);
      tempScreen = result + mathSymbolStr;
      firstNumberStr = result;
      firstNumber = parseInt(firstNumberStr);

      secondNumberStr = null;
      secondNumber = 0;
      previusMathSymbolStr = null;
    }

  } else {
    return;
  }
    
}

function doMath (symbol) {
  
  switch (symbol) {
    case "+":
      return firstNumber + secondNumber;
      break;
    case "-":
      return firstNumber - secondNumber;
      break;
    case "×":
      return firstNumber * secondNumber;
      break;
    case "÷":
      return firstNumber / secondNumber;
      break;
  }
  

}

function handleBack () {
  if (!secondNumberStr) {
    
    if (mathSymbolStr) {

      mathSymbolStr = null;
      tempScreen = firstNumberStr;
   
    } else {
      
      firstNumberStr = firstNumberStr.substring(0, firstNumberStr.length - 1);
      firstNumber = parseInt(firstNumberStr);
      tempScreen = firstNumberStr;
      
      if (firstNumberStr.length === 0){
        firstNumber = 0;
        tempScreen = "0";
      }

    }
      
  } else {
    
    secondNumberStr = secondNumberStr.substring(0, secondNumberStr.length - 1);
    secondNumber = parseInt(secondNumberStr);
    tempScreen = firstNumberStr + mathSymbolStr + secondNumberStr;
    if (secondNumberStr.length === 0){
      secondNumber = 0;
      secondNumberStr = null;
    }
    
  }
  
  
}


function handleNumber (numberStr) {
  
  if (!mathSymbolStr) {

    if (!firstNumberStr) {
      firstNumberStr = numberStr;
    } else {
      firstNumberStr += numberStr;
    }
    
    firstNumber = parseInt(firstNumberStr);
    tempScreen = firstNumberStr;

  } else if (mathSymbolStr){
    if (!secondNumberStr) {
      secondNumberStr = numberStr;
    } else {
      secondNumberStr += numberStr;
    }
    
    secondNumber = parseInt(secondNumberStr);
    tempScreen = firstNumberStr + mathSymbolStr + secondNumberStr;

  }

   
}
