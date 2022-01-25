class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    //Function: Clears Numbers / For "AC" button
    clear() { 
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    //Function: Deletes last entered number / For "DEL" button
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    //Function: Allows for one decimal point in a number
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    //Function: For choosing the operator
    chooseOperator(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    //Function: Solving the problem based on the operator the user inputs
    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+': 
                computation = previous + current
                break
            case '-': 
                computation = previous - current
                break
            case '*': 
                computation = previous * current
                break
            case '÷': 
                computation = previous / current
                break
            default: 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    //Function: Displaying the number the user clicks on
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
    }

    //Function: Updating the display
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

//Turning html buttons into const
const numberButtons = document.querySelectorAll('[number]')
const operatorButtons = document.querySelectorAll('[operator]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[all-clear]')
const previousOperandTextElement = document.querySelector('[previous-operand]')
const currentOperandTextElement = document.querySelector('[current-operand]')

//Making a new calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//Calling functions for Number Buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

//Calling functions for Operator Buttons
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})

//Calling functions for Equal Button
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay() 
})

//Calling functions for Clear Button
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay() 
})

//Calling functions for Delete Button
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay() 
})
