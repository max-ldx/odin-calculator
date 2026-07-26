const expression = {
    operator: null,
    firstOperand: null,
    secondOperand: null
}

const display = {
    value: ""
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

const digits = {
    "zero": 0,
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

function operate(operator, firstOperand, secondOperand) {
    if (!(operator in operations)) throw new RangeError("Invalid operator.");

    return operations[operator](firstOperand, secondOperand);
}