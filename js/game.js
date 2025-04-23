/**
 * Canvas-Element des Spiels
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Die Spielwelt
 * @type {World}
 */
let world;

/**
 * Tastatursteuerung
 * @type {Keyboard}
 */
keyboard = new Keyboard()

/**
 * Mobile Steuerung
 * @type {MobileControls}
 */
let mobileControls;

/**
 * Initialisiert das Spiel: Canvas, Welt und mobile Steuerung
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileControls = new MobileControls(keyboard);
}

/**
 * Initialisiert die Tastatursteuerung
 */
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

window.onload = () => {
    keySettings() 
    checkOrientation()
}

document.getElementById('start').addEventListener('click', startGame)
document.getElementById('restart').addEventListener('click', restartGame)
document.getElementById('main-menu').addEventListener('click', backToMainMenu)
document.getElementById('controller').addEventListener('click', keyAssignment)
document.getElementById('fullscreenBtn').addEventListener('click', (event) => {
    toggleFullscreen()
    event.currentTarget.blur()
})
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

/**
 * Zeigt eine Warnung, wenn das Gerät im Hochformat ist
 */
function checkOrientation() {
    const warning = document.getElementById('orientation-warning');
    if (window.innerHeight > window.innerWidth) {
        warning.classList.remove('d-none');
    } else {
        warning.classList.add('d-none');
    }
}

/**
 * Startet das Spiel
 */
function startGame() {
    removeOldTouchBtns()
    stopMusic()
    clearAllInterval()
    initLevel()
    init()
    showTouchButtons()
    document.getElementById('startScreen').classList.add('d-none')
}

/**
 * Zeigt Touch-Buttons auf Mobilgeräten
 */
function showTouchButtons() {
    let touch = document.getElementById("mobileControls")
    if(window.innerWidth < 720){
        touch.classList.remove('d-none')
    }
}

/**
 * Startet das Spiel neu
 */
function restartGame() {
    clearAllInterval()
    level1 = null
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    removeWinningScreen()
    checkMobileControl()
    removeOldTouchBtns()
    stopMusic();
    resetLevel()
}

/**
 * Setzt das Level zurück und initialisiert die Welt neu
 */
function resetLevel() {
    setTimeout(() => {
        world = null;
        mobileControls = null;
        keyboard = new Keyboard()
        initLevel();
        world = new World(canvas, keyboard);
        mobileControls = new MobileControls(keyboard);
        world.updateMuteIcon();
        world.restartMusic();
    }, 100);
}

/**
 * Überprüft und zeigt die mobile Steuerung, wenn nötig
 */
function checkMobileControl() {
    let touch = document.getElementById("mobileControls");
    if (window.innerWidth < 720 && touch) {
        touch.classList.remove('d-none');
    }
}

/**
 * Entfernt den Gewinnbildschirm
 */
function removeWinningScreen() {
    let btnContainer = document.getElementById('buttonContainer');
    let winningScreen = document.getElementById('winningScreen');
    if (!btnContainer.classList.contains('d-none')) {
        btnContainer.classList.add('d-none');
        if (!winningScreen.classList.contains('d-none')) {
            winningScreen.classList.add('d-none');
        }
    }
}

/**
 * Entfernt alte Touch-Buttons
 */
function removeOldTouchBtns() {
    let oldControls = document.getElementById('mobileControls');
    if (oldControls) {
        oldControls.remove();
    }
}

/**
 * Stoppt alle aktiven Intervalls
 */
function clearAllInterval() {
    for (let i = 1; i < 99999; i++) {
        clearInterval(i);
    }
}

/**
 * Stoppt die Hintergrundmusik
 */
function stopMusic() {
    if (world && world.backgroundMusic) {
        world.backgroundMusic.pause();
        world.backgroundMusic.currentTime = 1;
    }
}

/**
 * Zeigt das Hauptmenü an
 */
function backToMainMenu() {
    document.getElementById('startScreen').classList.remove('d-none')
    document.getElementById('buttonContainer').classList.add('d-none')
    document.getElementById('winningScreen').classList.add('d-none')
}

/**
 * Zeigt oder versteckt die Tastenbelegung
 */
function keyAssignment() {
    document.getElementById('keyAssignment').classList.toggle('d-none')
}

// Mute-Button Event nach kleiner Verzögerung
setTimeout(() => {
    document.getElementById('muteButton').addEventListener('click', () => {
        if (world) {
            world.toggleMute();
        }
    });
}, 100)

/**
 * Schaltet zwischen Vollbildmodus und normalem Modus um
 */
function toggleFullscreen() {
    let fullscreenContainer = document.getElementById('fullscreenContainer');
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreen();
        closeFullscreen()
    } else {
        enterFullscreen(fullscreenContainer);
        fullscreenStyle()
    }
}

/**
 * Aktiviert den Vollbildmodus für ein Element
 * @param {HTMLElement} element 
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
}

/**
 * Beendet den Vollbildmodus
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}

/**
 * Fügt dem Canvas und Overlay spezielle Vollbild-Stile hinzu
 */
function fullscreenStyle() {
    let canvas = document.getElementById('canvas')
    let overlay = document.getElementById('overlay')
    canvas.classList.add('fullscreen-container-big')
    overlay.classList.add('fullscreen-container-big')
}

/**
 * Entfernt Vollbild-Stile von Canvas und Overlay
 */
function closeFullscreen() {
    let canvas = document.getElementById('canvas')
    let overlay = document.getElementById('overlay')
    canvas.classList.remove('fullscreen-container-big')
    overlay.classList.remove('fullscreen-container-big')
}
