// Palabras y pistas para el juego
const palabrasConPistas = [
    { palabra: 'JAVASCRIPT', pista: 'Lenguaje de programación para la web' },
    { palabra: 'MENTIROSOS', pista: 'Le piden código a la IA y dicen que ellos lo escribieron' },
    { palabra: 'HTML', pista: 'Lenguaje de marcado para la creación de sitios web' },
    { palabra: 'PROGRAMACION', pista: 'Actividad de escribir instrucciones para computadoras' },
    { palabra: 'PIOPIO', pista: 'Sonido que hacen los pollitos' },
    { palabra: 'BACKEND', pista: 'Parte del desarrollo web que no es visible para el usuario' },
    { palabra: 'FRONTEND', pista: 'Parte visible de una aplicación web que interactúa con el usuario' }
];

// Elementos del DOM
const wordDisplay = document.getElementById('word');
const hintDisplay = document.getElementById('hint'); 
const lettersContainer = document.getElementById('letters');
const message = document.getElementById('message');
const livesCounter = document.getElementById('lives-counter');
const hangmanDrawing = document.getElementById('hangman-drawing');

// Estado del juego
let palabraSeleccionada = '';
let pistaSeleccionada = ''; 
let vidas = 3; // Solo 3 oportunidades
let letrasCorrectas = [];
let letrasIncorrectas = [];
let intentos = 0; // Control de intentos

// Crear partes del muñeco con las imágenes
function crearMuñeco() {
    const part1 = document.createElement('img');
    part1.src = 'images/parte1.png'; // Ruta de la primera parte (parte superior)
    part1.classList.add('hangman-part', 'part1');
    
    const part2 = document.createElement('img');
    part2.src = 'images/parte2.png'; // Ruta de la segunda parte (parte inferior)
    part2.classList.add('hangman-part', 'part2');
    
    const part3 = document.createElement('img');
    part3.src = 'images/parte3.png'; // Ruta de la tercera parte (parte central)
    part3.classList.add('hangman-part', 'part3');
    
    hangmanDrawing.appendChild(part1);
    hangmanDrawing.appendChild(part2);
    hangmanDrawing.appendChild(part3);
}

// Función para seleccionar una palabra y su pista
function seleccionarPalabra() {
    const randomIndex = Math.floor(Math.random() * palabrasConPistas.length);
    palabraSeleccionada = palabrasConPistas[randomIndex].palabra;
    pistaSeleccionada = palabrasConPistas[randomIndex].pista;
    letrasCorrectas = Array(palabraSeleccionada.length).fill('_');
    mostrarPalabra();
    mostrarPista();
}

// Función para mostrar la palabra en la pantalla
function mostrarPalabra() {
    wordDisplay.innerText = letrasCorrectas.join(' ');
}

// Función para mostrar la pista en la pantalla
function mostrarPista() {
    hintDisplay.innerText = 'Pista: ' + pistaSeleccionada;
}

// Función para crear los botones de letras
function crearBotonesLetras() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let letra of letras) {
        const button = document.createElement('button');
        button.innerText = letra;
        button.addEventListener('click', () => manejarIntento(letra, button));
        lettersContainer.appendChild(button);
    }
}

// Función para manejar los intentos de las letras
function manejarIntento(letra, button) {
    if (palabraSeleccionada.includes(letra)) {
        button.classList.add('green'); 
        for (let i = 0; i < palabraSeleccionada.length; i++) {
            if (palabraSeleccionada[i] === letra) {
                letrasCorrectas[i] = letra;
            }
        }
        mostrarPalabra();
        verificarVictoria();
    } else {
        button.classList.add('red');
        intentos++;
        vidas--; // Restar una vida
        actualizarVidas();
        mostrarParteMuñeco();
        
        if (vidas === 0) {
            mensajeFinal('¡Perdiste! La palabra era ' + palabraSeleccionada);
        }
    }
    button.disabled = true;
}

// Función para actualizar el contador de vidas
function actualizarVidas() {
    livesCounter.innerText = vidas;
}

// Mostrar las partes del muñeco según el orden: parte1 (arriba), parte2 (abajo), parte3 (centro)
function mostrarParteMuñeco() {
    const parts = document.getElementsByClassName('hangman-part');
    if (intentos === 1) {
        parts[0].style.display = 'block'; // Mostrar parte1 (superior)
    } else if (intentos === 2) {
        parts[1].style.display = 'block'; // Mostrar parte2 (inferior)
    } else if (intentos === 3) {
        parts[2].style.display = 'block'; // Mostrar parte3 (central)
    }
}

// Verificar si el jugador ha ganado
function verificarVictoria() {
    if (!letrasCorrectas.includes('_')) {
        // El jugador ha completado la palabra

        // Ocultar el contenedor del muñeco
        hangmanDrawing.innerHTML = '';

        // Cambiar el fondo a globos y confeti
        document.body.style.backgroundImage = 'url("images/globos-confeti.png")';
        document.body.style.backgroundSize = 'cover';

        // Mostrar la imagen del pollito programador feliz
        const imgVictoria = document.createElement('img');
        imgVictoria.src = 'images/victoria.png'; // Ruta de la imagen de victoria
        imgVictoria.alt = 'Pollito programador feliz';
        imgVictoria.classList.add('img-fluid'); // Clase para ser responsive
        lettersContainer.innerHTML = ''; // Limpiar botones de letras
        lettersContainer.appendChild(imgVictoria);
    }
}

// Mostrar mensaje final o imagen de derrota
function mensajeFinal(texto) {
    // Limpiar el contenedor de letras
    lettersContainer.innerHTML = ''; 

    // Eliminar todas las partes del muñeco al finalizar el juego
    hangmanDrawing.innerHTML = ''; 

    // Mostrar la imagen completa del pollito ahorcado si el jugador pierde
    if (texto.includes('¡Perdiste!')) {
        const imgDerrota = document.createElement('img');
        imgDerrota.src = 'images/pollito-ahorcado.png'; // Ruta de la imagen de derrota completa
        imgDerrota.alt = 'Pollito ahorcado completo';
        imgDerrota.classList.add('img-fluid');
        hangmanDrawing.appendChild(imgDerrota);

        // Mostrar el mensaje final
        message.innerText = texto;
    }
}

// Inicializar el juego
crearMuñeco();
seleccionarPalabra();
crearBotonesLetras();
