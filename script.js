const expression = {
    operator: null,
    firstOperand: null,
    secondOperand: null
};

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
        if (b === 0) throw new RangeError("Division par zéro");
        return a / b;
    }
};

const MAX_LENGTH = 15; // Limite de 15 caractères

const display = document.querySelector("#display");
const keyboard = document.querySelector("#keyboard");

// --- Clics souris ---
keyboard.addEventListener("click", (e) => {
    const key = e.target.closest(".key");
    if (!key) return;

    const id = key.id;

    if (key.classList.contains("digit")) {
        handleDigit(key.textContent.trim());
    } else if (key.classList.contains("operator")) {
        handleOperator(key.textContent.trim());
    } else if (id === "clear") {
        resetExpression();
        updateDisplay();
    } else if (id === "backspace") {
        handleBackspace();
        updateDisplay();
    } else if (id === "decimal") {
        addDecimal();
        updateDisplay();
    }
});

// --- Clavier physique ---
document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key >= "0" && key <= "9") {
        handleDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
    } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleOperator("=");
    } else if (key === "Backspace") {
        handleBackspace();
        updateDisplay();
    } else if (key === "Escape") {
        resetExpression();
        updateDisplay();
    } else if (key === "." || key === ",") {
        addDecimal();
        updateDisplay();
    }
});

// --- Logique métier ---
function handleDigit(digit) {
    if (expression.operator === null) {
        // Bloque la saisie si la limite de 15 caractères est atteinte
        if (expression.firstOperand && expression.firstOperand.length >= MAX_LENGTH) return;

        if (expression.firstOperand === "0") {
            expression.firstOperand = digit;
        } else {
            expression.firstOperand = (expression.firstOperand ?? "") + digit;
        }
    } else {
        // Bloque la saisie si la limite de 15 caractères est atteinte
        if (expression.secondOperand && expression.secondOperand.length >= MAX_LENGTH) return;

        if (expression.secondOperand === "0") {
            expression.secondOperand = digit;
        } else {
            expression.secondOperand = (expression.secondOperand ?? "") + digit;
        }
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    if (expression.firstOperand === null) return;

    if (expression.secondOperand !== null) {
        try {
            const result = operate(expression.operator, expression.firstOperand, expression.secondOperand);

            // Formatage du résultat : si la chaîne dépasse 15 caractères, on adapte
            let resultString = String(result);
            if (resultString.length > MAX_LENGTH) {
                // Utilise la notation scientifique si le nombre est trop grand
                resultString = Number(result).toPrecision(9).toString();
            }

            expression.firstOperand = resultString;
            expression.secondOperand = null;
            expression.operator = nextOperator === "=" ? null : nextOperator;
        } catch (err) {
            display.textContent = "Erreur";
            resetExpression();
            return;
        }
    } else if (nextOperator !== "=") {
        expression.operator = nextOperator;
    }

    updateDisplay();
}

function addDecimal() {
    if (expression.operator === null) {
        if (expression.firstOperand === null) {
            expression.firstOperand = "0.";
        } else if (!expression.firstOperand.includes(".") && expression.firstOperand.length < MAX_LENGTH) {
            expression.firstOperand += ".";
        }
    } else {
        if (expression.secondOperand === null) {
            expression.secondOperand = "0.";
        } else if (!expression.secondOperand.includes(".") && expression.secondOperand.length < MAX_LENGTH) {
            expression.secondOperand += ".";
        }
    }
}

function handleBackspace() {
    if (expression.secondOperand !== null) {
        expression.secondOperand = expression.secondOperand.slice(0, -1) || null;
    } else if (expression.operator !== null) {
        expression.operator = null;
    } else if (expression.firstOperand !== null) {
        expression.firstOperand = expression.firstOperand.slice(0, -1) || null;
    }
}

function operate(operator, firstOperand, secondOperand) {
    if (!(operator in operations)) throw new RangeError("Opérateur invalide.");
    return operations[operator](Number(firstOperand), Number(secondOperand));
}

function updateDisplay() {
    display.textContent = expression.secondOperand ?? expression.firstOperand ?? "0";
}

function resetExpression() {
    expression.operator = null;
    expression.firstOperand = null;
    expression.secondOperand = null;
}