class Calculator {

    constructor(previous,current){
        this.currentDisplay = current;
        this.previousDisplay = previous; 
        this.clear();
    }

    clear(){
        this.current = "";
        this.previous = "";
        this.operator = null;
    }

    delete(){
        this.current = this.current.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === "." && this.current.indexOf(".") !== -1) return;

        this.current += number.toString();
    }

    chooseOperator(operator){
        if(this.current === "") return;
        if(this.previous !== ""){
            this.compute();
        }
        this.operator = operator;
        this.previous = this.current;
        this.current = "";
    }

    compute(){
        let computation;
        let prev = parseInt(this.previous);
        let current = parseInt(this.current);

        if(isNaN(this.previous) || isNaN(this.current)) return;

        switch(this.operator){
            case "+":
                computation = prev + current;
                break;
            
            case "-":
                computation = prev - current;
                break;
            
            case "*":
                computation = prev * current;
                break;
            
            case "÷":
                computation = prev / current;
                break;
            
            default: 
               return;
        }

        this.current = computation;
        this.operator = null;
        this.previous = "";
    }

    getDisplayWithComma(number){
        let stringNumber = number.toString();
        let intNumber = parseInt(stringNumber.split(".")[0]);
        let decimalNumber = stringNumber.split(".")[1];
        let displayNumber;
        if(isNaN(intNumber)){
            displayNumber = ""
        } else {
            displayNumber = intNumber.toLocaleString("en", {maximumFractionDigits: 0});
        }

        if(decimalNumber !== undefined){
            return `${displayNumber}.${decimalNumber}`
        } else {
            return displayNumber;
        }
    }

    updateDisplay(){
        this.currentDisplay.innerText = this.getDisplayWithComma( this.current );
        if(this.operator !== null){
            this.previousDisplay.innerText = `${ this.getDisplayWithComma( this.previous )} ${this.operator}`
        } else {
            this.previousDisplay.innerText = "";
        }
    }

}

const dataNumber = document.querySelectorAll(`[data-number]`);
const dataOperator = document.querySelectorAll(`[data-operator]`);
const dataEquals = document.querySelector(`[data-equals]`);
const dataDelete = document.querySelector(`[data-delete]`);
const dataAllClear = document.querySelector(`[data-all-clear]`);
const dataPreviousOperand = document.querySelector(`[data-previous-operand]`);
const dataCurrentOperand = document.querySelector(`[data-current-operand]`);

const calculator = new Calculator(dataPreviousOperand,dataCurrentOperand);

dataNumber.forEach( button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

dataOperator.forEach( button => {
    button.addEventListener("click", () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})

dataEquals.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

dataDelete.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

dataAllClear.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})