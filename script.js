const expression = {
    operator: null,
    firstOperand: null,
    secondOperand: null
}

const operations = {
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "/": (firstOperand, secondOperand) => {
        if (secondOperand === 0) throw new RangeError("Cannot divide by 0.");

        return firstOperand / secondOperand;
    }
}

function operate(operator, firstOperand, secondOperand) {
    if (!(operator in operations)) throw new RangeError("Invalid operator.");

    return operations[operator](firstOperand, secondOperand);
}