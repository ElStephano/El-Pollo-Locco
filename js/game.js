let canvas;
let world;
keyboard = new Keyboard()
const backgroundMusic = new Audio('./audio/Menu.mp3');
let isMuted = true;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function keySettings() {
    window.addEventListener('keydown', (event) => {
        if (event.keyCode == 39)
            keyboard.RIGHT = true

        if (event.keyCode == 37)
            keyboard.LEFT = true

        if (event.keyCode == 38)
            keyboard.UP = true

        if (event.keyCode == 40)
            keyboard.DOWN = true

        if (event.keyCode == 32)
            keyboard.SPACE = true
    })

    window.addEventListener('keyup', (event) => {
        if (event.keyCode == 39)
            keyboard.RIGHT = false

        if (event.keyCode == 37)
            keyboard.LEFT = false

        if (event.keyCode == 38)
            keyboard.UP = false

        if (event.keyCode == 40)
            keyboard.DOWN = false

        if (event.keyCode == 32)
            keyboard.SPACE = false
    })
}

window.onload = () => { keySettings() }
document.getElementById('start').addEventListener('click', startGame)
document.getElementById('restart').addEventListener('click', restartGame)
document.getElementById('main-menu').addEventListener('click', backToMainMenu)


function startGame() {
    initLevel()
    init()
    document.getElementById('startScreen').classList.add('d-none')
}


function restartGame() {
    level1 = null
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // keySettings()
    let btnContainer = document.getElementById('buttonContainer')
    if (!btnContainer.classList.contains('d-none')) {
        btnContainer.classList.add('d-none')
    }
    setTimeout(() => {
        world = null
        initLevel()
        world = new World(canvas, keyboard);
        // startGame()
    }, 100)
}


function backToMainMenu() {
    document.getElementById('startScreen').classList.remove('d-none')
    document.getElementById('buttonContainer').classList.add('d-none')
}





function startMusic() {
    backgroundMusic.loop = true; // Musik in Dauerschleife
    backgroundMusic.volume = 0; // Startet stumm
    backgroundMusic.play().then(() => {
        backgroundMusic.volume = 0.5; // Lautstärke nach dem ersten Klick anpassen
        isMuted = false; // Musik ist nun nicht mehr stumm
        console.log("Musik gestartet");
        // Entferne den Event-Listener, da die Musik nun gestartet ist
        const muteButton = document.getElementById('muteButton');
        muteButton.removeEventListener('click', startMusic);
    }).catch(error => {
        console.error("Musik konnte nicht abgespielt werden:", error);
    });
}

// Funktion zum Umschalten der Stummschaltung
function toggleMute() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    updateMuteIcon();
}

// Funktion zum Aktualisieren des Icons
function updateMuteIcon() {
    const muteIcon = document.getElementById('muteIcon');
    muteIcon.src = isMuted ? 'img/10_Icons/mute.png' : 'img/10_Icons/loud.png';
}

// Funktion zur Initialisierung des Mute-Buttons
function initMuteButton() {
    const muteButton = document.getElementById('muteButton');

    // Beim ersten Klick auf den Mute-Button wird die Musik gestartet
    muteButton.addEventListener('click', startMusic, { once: true });

    // Der Mute-Button kann auch weiterhin die Lautstärke steuern
    muteButton.addEventListener('click', toggleMute);
}

// Initialisierung nach dem Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    initMuteButton();
});






