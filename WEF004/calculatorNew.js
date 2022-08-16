let Ans = undefined;
let answerCalculated = false;
let expression = []

// display is used to show the whole expression, while current is used to show the latest number entered
const numbers = document.querySelectorAll('div#panelContainer > .num');
for (let number of numbers) {
    const numID = number.id;
    const id = numID.replace("but","");
    number.addEventListener("click", function(event){
        if (answerCalculated) {
            display.innerHTML = "";
            answerCalculated = false;
        }
        display.innerHTML = display.innerHTML + id;
        current.innerHTML = current.innerHTML + id;
    })
}
// Operators includes +-*/()
const operators = document.querySelectorAll('div#panelContainer > .ops');
for (let operator of operators) {
    operator.addEventListener("click", function(event){
        setupCalculatorOps(event);
    })
}

function setupCalculatorOps(event) {
    console.log(display.innerHTML.length)
    const id = event.target.id;
    // Clear the screen and use Ans to continue a new calculation
    if (answerCalculated == true) {
        display.innerHTML = "Ans"
        current.innerHTML = `${Ans}`
        answerCalculated = false
    } else 
    // Automitically add a 0 if no number is typed before the operators
    if (display.innerHTML.length == 0 && (id != 'openbracket')) {
        display.innerHTML = "0"
        current.innerHTML = "0"
    }
    // Store the number in current into the expression array
    if (!isNaN(parseFloat(current.innerHTML))) {
        expression.push(parseFloat(current.innerHTML));
        current.innerHTML = "";
    }
    // Each numbers and each operators are separately saved in different elements of the array
    switch(id){
        case "add":
            display.innerHTML = display.innerHTML + "+";
            expression.push("+");
            break;
        case "minus":
            display.innerHTML = display.innerHTML + "-";
            expression.push("-");
            break;
        case "multiply":
            display.innerHTML = display.innerHTML + "*";
            expression.push("*");
            break;
        case "divide":
            display.innerHTML = display.innerHTML + "/";
            expression.push("/");
            break;
        case "openbracket":
            display.innerHTML = display.innerHTML + "(";
            expression.push("(");
            break;
        case "closebracket":
            display.innerHTML = display.innerHTML + ")";
            expression.push(")");
            break;
    }
}

document.querySelector('#result').addEventListener("click", function(event) {
    if (!isNaN(parseFloat(current.innerHTML))) {
        expression.push(parseFloat(current.innerHTML));
        current.innerHTML = "";
    }
    const calculateThis = display.innerHTML;
    Ans = calculation(expression);
    display.innerHTML = `${calculateThis} =`;
    current.innerHTML = `${Ans}`;
    answerCalculated = true;
})

// Reset to the initial condition
document.querySelector('#reset').addEventListener("click", function(event) {
    display.innerHTML = "";
    current.innerHTML = "";
    answerCalculated = false;
    Ans = undefined;
    expression = [];
})

// Use the result of the last calculation
document.querySelector('#answer').addEventListener("click", function(event) {
    if (answerCalculated) {
        display.innerHTML = "";
        current.innerHTML = "";
        expression = [];
        answerCalculated = false
    }
    display.innerHTML = display.innerHTML + "Ans"
    current.innerHTML = current.innerHTML + `${Ans}`
})

function calculation(expression) {
    // Not enough operators or numbers for calculation
    if (expression.length == 2) {
        return "error";
    }
    if (expression.length == 1) {
        return expression[0];
    }
    // length = 3 means a simple calculation
    if (expression.length == 3) {
        switch(expression[1]) {
            case '+':
                return expression[0]+expression[2];
            case '-':
                return expression[0]-expression[2];
            case '*':
                return expression[0]*expression[2];
            case '/':
                return expression[0]/expression[2];
            default:
                return "error"
        }
    }
    // length > 3, break down the calculation into a smaller part and recursively run this function
    // Solve the expression in () first
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '(') {
            for (let j = expression.length-1; j > i; j--) {
                if (expression[j] === ')') {
                    let previous = expression.slice(0,i);
                    const newValue = calculation(expression.slice(i+1,j))
                    let next = expression.slice(j+1);
                    previous.push(newValue)
                    const newExpression = previous.concat(next)
                    return calculation(newExpression)
                }
            }
        }
    }
    // Solve the multiply and division
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '*' || expression[i] === '/') {
            let previous = []
            if (i != 1) {
                previous = expression.slice(0,i-1);
            }
            const newValue = calculation(expression.slice(i-1,i+2))
            previous.push(newValue)
            if (i == expression.length - 2) {
                const newExpression = previous
                return calculation(newExpression)
            } else {
                let next = expression.slice(i+2)
                const newExpression = previous.concat(next);
                return calculation(newExpression)
            }
            return calculation(newExpression)
        }
    }
    // Solve the addition and subtraction
    if (expression[1] == "+" || expression[1] == "-") {
        let newValue = calculation(expression.slice(0,3));
        let next = expression.slice(3)
        next.unshift(newValue);
        return calculation(next)
    }
    // Error cases
    return "error"
}