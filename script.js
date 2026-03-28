let fullOp = "";
let res = 0;

function handleClick(number) {

    if (number === "CE") {
        fullOp = "";
        showNumber("0");
        return;
    }

    if (number === "+/-") {
        if (fullOp === "" || fullOp === "0") return;

        let index = -1;
        const operadores = ["+", "-", "*", "/", "^"];

        for (let i = fullOp.length - 1; i >= 0; i--) {
            if (operadores.includes(fullOp[i])) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            if (fullOp.startsWith("-")) {
                fullOp = fullOp.slice(1);
            } else {
                fullOp = "-" + fullOp;
            }
        } else {
            let antes = fullOp.slice(0, index + 1);
            let numero = fullOp.slice(index + 1);

            if (numero.startsWith("-")) {
                numero = numero.slice(1);
            } else {
                numero = "-" + numero;
            }

            fullOp = antes + numero;
        }

        showNumber(fullOp);
        return;
    }

    if (number === ".") {
        let partes = fullOp.split(/[\+\-\*\/\^]/);
        let ultimo = partes[partes.length - 1];

        if (!ultimo.includes(".")) {
            fullOp += ".";
            showNumber(fullOp);
        }
        return;
    }

    let operadores = ["+", "-", "*", "/", "^"];
    if (operadores.includes(number)) {
        if (fullOp === "" && number !== "-") return;

        let ultimo = fullOp[fullOp.length - 1];
        if (operadores.includes(ultimo)) return;
    }

    fullOp = (fullOp === "0") ? number : fullOp + number;
    showNumber(fullOp);
}

function calculate() {

    if (fullOp === "") return;

    if (/[\+\-\*\/\^]$/.test(fullOp)) {
        showNumber("Error");
        return;
    }

    let partes = fullOp.match(/-?\d+(\.\d+)?|[\+\-\*\/\^]/g);

    if (!partes || partes.length < 3) {
        showNumber("Error");
        return;
    }

    let resultado = Number(partes[0]);

    for (let i = 1; i < partes.length; i += 2) {
        let op = partes[i];
        let num = Number(partes[i + 1]);

        if (isNaN(num)) {
            showNumber("Error");
            return;
        }

        if (op === "+") resultado = resultado + num;
        if (op === "-") resultado = resultado - num;
        if (op === "*") resultado = resultado * num;
        if (op === "/") {
            if (num === 0) {
                showNumber("Error");
                fullOp = "";
                return;
            }
            resultado = resultado / num;
        }
        if (op === "^") resultado = resultado ** num;
    }

    showNumber(resultado);
    addToHistory(fullOp, resultado);

    fullOp = resultado.toString();
}

function showNumber(n) {
    document.getElementById("screen").innerHTML = n;
}

function addToHistory(operation, result) {

    let history = document.getElementById("history");
    if (!history) return;

    let item = document.createElement("div");
    item.className = "history-item";

    let opText = document.createElement("div");
    opText.className = "history-operation";
    opText.innerHTML = operation;

    let resText = document.createElement("div");
    resText.className = "history-result";
    resText.innerHTML = "= " + result;

    item.appendChild(opText);
    item.appendChild(resText);

    history.prepend(item);
}

function clearHistory() {
    document.getElementById("history").innerHTML = "";
}

showNumber("0");