// ========================= VARIABLES =========================

let firstNumber = 0;
let secondNumber = 0;
let result = 0;

const screen = document.querySelector(".screen");

let firstNumberStr;
let secondNumberStr;

let mathSymbol;
let previusMathSymbol;

let tempScreen = "0";


// ====================== EVENT LISTENERS ======================

document.querySelector(".buttons").addEventListener("click", function(event){
  if (event.target.tagName === "BUTTON") {
    clickButton(event.target.innerText);
  }
});


// ========================= FUNCTIONS =========================

function clickButton (str) {
  if (isNaN(str)) {
    handleSymbol(str);
  } else {
    handleNumber(str);
  }
  screen.innerText = tempScreen;
}

function handleSymbol (str) {
  
  if (tempScreen === "0") return;

  switch (str) {
    case "←":
      handleBack();
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMathSymbol(str);
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
  mathSymbol = null;
  previusMathSymbol = null;
  tempScreen = "0";
}

function handleEqual () {
  
  if (!mathSymbol) return;
  
  result = doMath(mathSymbol);
  tempScreen = result;

  secondNumberStr = null;
  secondNumber = 0;
  mathSymbol = null;
    
  firstNumber = result;
  firstNumberStr = result.toString();
}

function handleMathSymbol (symbol) {
  if (!previusMathSymbol) {
    
    if (!mathSymbol) {
      mathSymbol = symbol;
      tempScreen += mathSymbol;
    } else {
      previusMathSymbol = mathSymbol;
      mathSymbol = symbol;
      result = doMath(previusMathSymbol);
      tempScreen = result + mathSymbol;
      firstNumberStr = result;
      firstNumber = parseInt(firstNumberStr);

      secondNumberStr = null;
      secondNumber = 0;
      previusMathSymbol = null;
    }

  } else {
    return;
  }
    
}

function doMath (symbol) {
  switch (symbol) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "×":
      return firstNumber * secondNumber;
    case "÷":
      return firstNumber / secondNumber;
  }
}

function handleBack () {
  if (!secondNumberStr) {
    
    if (mathSymbol) {

      mathSymbol = null;
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
    tempScreen = firstNumberStr + mathSymbol + secondNumberStr;
    
    if (secondNumberStr.length === 0){
      secondNumber = 0;
      secondNumberStr = null;
    }
    
  }
    
}

function handleNumber (numberStr) {
  
  if (!mathSymbol) {

    if (!firstNumberStr) {
      firstNumberStr = numberStr;
    } else {
      firstNumberStr += numberStr;
    }
    
    firstNumber = parseInt(firstNumberStr);
    tempScreen = firstNumberStr;

  } else if (mathSymbol){
    if (!secondNumberStr) {
      secondNumberStr = numberStr;
    } else {
      secondNumberStr += numberStr;
    }
    
    secondNumber = parseInt(secondNumberStr);
    tempScreen = firstNumberStr + mathSymbol + secondNumberStr;

  }
   
}
