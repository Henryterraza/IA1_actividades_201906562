function reflex_agent(location, state) {
    if (state === "DIRTY") return "CLEAN";
    else if (location === "A") return "RIGHT";
    else if (location === "B") return "LEFT";
}

function test(states, visitedStates) {
    var location = states[0];
    var state = location === "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);

    document.getElementById("log").innerHTML += "<br>Location: " + location + " | Action: " + action_result;

    // Actualizar estados según la acción tomada
    if (action_result === "CLEAN") {
        if (location === "A") states[1] = "CLEAN";
        else if (location === "B") states[2] = "CLEAN";
    } else if (action_result === "RIGHT") {
        states[0] = "B";
    } else if (action_result === "LEFT") {
        states[0] = "A";
    }

    // Identificar el estado actual (0-7)
    var currentState = identifyState(states);
    if (!visitedStates.includes(currentState)) {
        
        visitedStates.push(currentState); // Marcar el estado como visitado
    }

    // Verificar si se han visitado los 8 estados
    if (visitedStates.length === 8) {
        document.getElementById("log").innerHTML += "<br>All states visited. Program finished!";
        return; // Finalizar el programa
    }

    // Continuar probando después de un retraso
    setTimeout(function () {
        test(states, visitedStates);
    }, 2000);
}

function identifyState(states) {
    var location = states[0];
    var aState = states[1];
    var bState = states[2];

    if (location === "A" && aState === "DIRTY" && bState === "DIRTY") return 0;
    if (location === "A" && aState === "DIRTY" && bState === "CLEAN") return 1;
    if (location === "A" && aState === "CLEAN" && bState === "DIRTY") return 2;
    if (location === "A" && aState === "CLEAN" && bState === "CLEAN") return 3;
    if (location === "B" && aState === "DIRTY" && bState === "DIRTY") return 4;
    if (location === "B" && aState === "DIRTY" && bState === "CLEAN") return 5;
    if (location === "B" && aState === "CLEAN" && bState === "DIRTY") return 6;
    if (location === "B" && aState === "CLEAN" && bState === "CLEAN") return 7;
}

// Estados iniciales
var states = ["A", "DIRTY", "DIRTY"];
var visitedStates = []; 

// Iniciar prueba
test(states, visitedStates);
