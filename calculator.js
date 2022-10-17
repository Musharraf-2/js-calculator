const VARIABLES = {};
const HISTORY = {};

const addVariables = () => {
  let variable = document.getElementById("variable").value;
  let value = document.getElementById("value").value
  if (validateVariableName(variable) && validateVariableValue(value)) {
    VARIABLES[variable] = value;
    document.getElementById("variable").value = "";
    document.getElementById("value").value = "";
    displayVariables();
  }
}

const validateVariableName = (variable) => {
  if (variable == "") {
    alert("Variable name cannot be empty.")
    return false;
  }
  if (variable.toLowerCase() == "pi" || variable.toLowerCase() == "e") {
    alert("This variable name is reserved.");
    return false;
  }
  if (/\d/.test(variable[0]) || !/[a-zA-Z_$]/.test(variable[0])) {
    alert("Vaibale name must start with alphabet or _ or $");
    return false;
  }
  if (variable in VARIABLES) {
    alert("Variable with this name aleady exists.");
    return false;
  }
  return true;
}

const validateVariableValue = (value) => {
  if (value == "") {
    alert("Value cannot be empty.")
    return false;
  }
  return true;
}

const displayVariables = () => {
  document.getElementById("variables").innerHTML = "";
  for (let key in VARIABLES) {
    document.getElementById("variables").innerHTML += `<tr><td>${key}</td><td>${VARIABLES[key]}</td><td><button class="btn btn-danger my-2" id="${key}" onclick=removeVaribale(this.id)>Remove</button></td></tr>`;
  }
}

const removeVaribale = (variable) => {
  delete VARIABLES[variable];
  displayVariables();
}

const displayHistory = () => {
  document.getElementById("expression").innerHTML = "";
  for (let key in HISTORY) {
    document.getElementById("expression").innerHTML += `<tr onclick=fillInput(this.id) id=${key}><td>${key}</td><td>${HISTORY[key]}</td><td><button class="btn btn-danger my-2" id="${key}" onclick=removeHistory(this.id)>Remove</button></td></tr>`;
  }
}

const removeHistory = (variable) => {
  delete HISTORY[variable];
  displayHistory();
}

const enterText = (text) => {
  document.getElementById("input").value += text;
  document.getElementById("output").value = "";
}

const evaluateExpression = () => {
  let expression = removeExtraSpaces(document.getElementById("input").value);
  document.getElementById("input").value = expression;
  let expressionCopy = expression;
  expression = replaceVariableValues(expression);
  console.log(expression)
  if (/[a-zA-Z_$]/.test(expression)) {
    alert("Variable used does not exist.")
    return;
  }
  try {
    let result = math.evaluate(expression).toFixed(4);
    if (isFinite(result)) {
      document.getElementById("output").value = result;
      HISTORY[expressionCopy] = result;
      displayHistory();
    }
    else {
      document.getElementById("output").value = "Dividing by Zero";
    }
  }
  catch {
    document.getElementById("output").value = "Invalid Expression";
  }
}

const removeText = () => {
  document.getElementById("input").value = "";
  document.getElementById("output").value = "";
}

const removeOneCharacter = () => {
  let expression = removeExtraSpaces(document.getElementById("input").value);
  document.getElementById("input").value = expression.slice(0, length - 1);
  document.getElementById("output").value = "";
}

const removeExtraSpaces = (expression) => {
  return expression.replace(/\s+/g, '').trim();
}

window.onload = () => {
  document.getElementById("input").addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      evaluateExpression();
    }
    if (e.code === "Backspace") {
      document.getElementById("output").value = "";
    }
  });
}

const replaceVariableValues = (expression) => {
  for (let key in VARIABLES) {
    if (expression.includes(key)) {
      let regex = new RegExp(key, "g");
      expression = expression.replace(regex, VARIABLES[key]);
    }
  }
  return expression;
}

const fillInput = (key) => {
  document.getElementById("input").value += key;
}
