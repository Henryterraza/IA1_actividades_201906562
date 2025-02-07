function reflex_agent(location, state) {
    if (state === "DIRTY") return "CLEAN";
    else if (location === "A") return "RIGHT";
    else if (location === "B") return "LEFT";
}

function setRandomState(states) {
    const randomState = Math.floor(Math.random() * 8);

    switch (randomState) {
        case 0: // A, DIRTY, DIRTY
            states[0] = "A";
            states[1] = "DIRTY";
            states[2] = "DIRTY";
            break;
        case 1: // A, DIRTY, CLEAN
            states[0] = "A";
            states[1] = "DIRTY";
            states[2] = "CLEAN";
            break;
        case 2: // A, CLEAN, DIRTY
            states[0] = "A";
            states[1] = "CLEAN";
            states[2] = "DIRTY";
            break;
        case 3: // A, CLEAN, CLEAN
            states[0] = "A";
            states[1] = "CLEAN";
            states[2] = "CLEAN";
            break;
        case 4: // B, DIRTY, DIRTY
            states[0] = "B";
            states[1] = "DIRTY";
            states[2] = "DIRTY";
            break;
        case 5: // B, DIRTY, CLEAN
            states[0] = "B";
            states[1] = "DIRTY";
            states[2] = "CLEAN";
            break;
        case 6: // B, CLEAN, DIRTY
            states[0] = "B";
            states[1] = "CLEAN";
            states[2] = "DIRTY";
            break;
        case 7: // B, CLEAN, CLEAN
            states[0] = "B";
            states[1] = "CLEAN";
            states[2] = "CLEAN";
            break;
    }
    document.getElementById("log").innerHTML += "<br>-------------------------------------------------------";
    document.getElementById("log").innerHTML += "<br>Seleccionando un nuevo estado ...";
    return;
}

function test(states, visitedStates) {

    var location = states[0];
    var state = location === "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);



    var currentState = identifyState(states);
    if (!visitedStates.includes(currentState)) {
        visitedStates.push(currentState);
        document.getElementById("log").innerHTML += "<br>Estado: " + currentState +
            " (Estados visitados: " + visitedStates.length + "/8)";


        document.getElementById("log").innerHTML += "<br>Location: " + location +
            " | State A: " + states[1] +
            " | State B: " + states[2] +
            " | Action: " + action_result;




        // Actualizar estados según la acción tomada
        if (action_result === "CLEAN") {
            if (location === "A") states[1] = "CLEAN";
            else if (location === "B") states[2] = "CLEAN";
        } else if (action_result === "RIGHT") {
            states[0] = "B";
        } else if (action_result === "LEFT") {
            states[0] = "A";
        }

        if (states[1] == "CLEAN" && states[2] == "CLEAN") {
            document.getElementById("log").innerHTML += "<br>Location: " + location +
                " | State A: " + states[1] +
                " | State B: " + states[2] +
                " | Action: " + action_result + "<br>";
            if (!visitedStates.length === 8) {
                setRandomState(states);
            }
        }

        // Verificar si se han visitado los 8 estados
        if (visitedStates.length === 8) {
            document.getElementById("log").innerHTML += "<br>¡Todos los estados han sido visitados! Programa finalizado.";
            document.getElementById("log").innerHTML += "<br>Secuencia de estados visitados: " + visitedStates.join(", ");
            return;
        }




    } else {
        document.getElementById("log").innerHTML += "<br>Estado: " + currentState +
            " (Estado ya visitado) <br>";

        setRandomState(states);
    }


    // Continuar probando después de un retraso
    setTimeout(function () {
        test(states, visitedStates);
    }, 500);
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