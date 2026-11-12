//En esta parte carga los elementos para que se muestren el DOM
const inputNombre = document.getElementById("nombreP");
const inputOxigeno = document.getElementById("oxigenoP");
const inputRitmo = document.getElementById("ritmoP");
const btnRegistrar = document.getElementById("btnRegistrar");
const tablaPacientes = document.getElementById("listaPacientes");

//Aqui se va a cargar la lista de pacientes guardados cuando se recarga la pagina
document.addEventListener("DOMContentLoaded", cargarPacientes);

//Creamos un evento de un boton para registrar un nuevo paciente
btnRegistrar.addEventListener("click", agregarPaciente);

function agregarPaciente(evento) {
    evento.preventDefault(); // Evita que recargue la página por defecto

    // Se valida que los campos no esten vacios
    if (inputNombre.value.trim() === "" || inputOxigeno.value.trim() === "" || inputRitmo.value.trim() === "") {
        alert("Por favor completa todos los campos");
        return;
    }

    // Captura valores
    const nombre = inputNombre.value.trim();
    const oxigeno = parseFloat(inputOxigeno.value);
    const ritmo = parseFloat(inputRitmo.value);

    
    let prioridad = "";
    let claseColor = "";

    if (oxigeno < 90 || ritmo > 130) {
        prioridad = "Rojo (Crítico)";
        claseColor = "table-danger"; // Rojo de Bootstrap
    } else if (oxigeno >= 90 && oxigeno <= 94) {
        prioridad = "Amarillo (Urgente)";
        claseColor = "table-warning"; // Amarillo de Bootstrap
    } else {
        prioridad = "Verde (Estable)";
        claseColor = "table-success"; // Verde de Bootstrap
    }

    // Aqui se crea el objeto paciente
    const nuevoPaciente = {
        nombre: nombre,
        oxigeno: oxigeno,
        ritmo: ritmo,
        prioridad: prioridad,
        claseColor: claseColor
    };

    // Obtener pacientes anteriores de localStorage, agregar el nuevo y guardar
    const pacientes = obtenerPacientes();
    pacientes.push(nuevoPaciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    //limpiar inputs
    mostrarPacientes();
    inputNombre.value = "";
    inputOxigeno.value = "";
    inputRitmo.value = "";
}

// 4. Función para obtener los pacientes
function obtenerPacientes() {
    return JSON.parse(localStorage.getItem("pacientes")) || [];
}

// 5. Función para mostrar los pacientes en la tabla HTML (Renderizado)
function mostrarPacientes() {
    const pacientes = obtenerPacientes();
    
    // Limpiar la tabla antes de volver a pintar
    tablaPacientes.innerHTML = "";

    pacientes.forEach((paciente) => {
        const fila = document.createElement("tr");
        fila.className = paciente.claseColor; // Pinta el renglón según el nivel de riesgo

        //Dibujar los datos de los pacientes en la tabla de la interfaz
        fila.innerHTML = `
            <td>${paciente.nombre}</td>
            <td>${paciente.oxigeno}%</td>
            <td>${paciente.ritmo} lpm</td>
            <td><strong>${paciente.prioridad}</strong></td>
        `;

        tablaPacientes.appendChild(fila);
    });
}

// 6. Función para cargar al iniciar
function cargarPacientes() {
    mostrarPacientes();
}