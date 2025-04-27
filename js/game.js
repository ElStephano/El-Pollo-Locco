/**
 * Canvas element of the game
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The game world
 * @type {World}
 */
let world;

/**
 * Keyboard control
 * @type {Keyboard}
 */
keyboard = new Keyboard()

/**
 * Mobile control
 * @type {MobileControls}
 */
let mobileControls;

/**
 * Initializes the game: Canvas, world and mobile controls
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileControls = new MobileControls(keyboard);
}

/**
 * Initializes the keyboard control
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
 * Displays a warning when the device is in portrait mode
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
 * Start the game
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
 * Shows touch buttons on mobile devices
 */
function showTouchButtons() {
    let touch = document.getElementById("mobileControls")
    if(window.innerWidth < 720){
        touch.classList.remove('d-none')
    }
}

/**
 * Restart the game
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
 * Resets the level and reinitializes the world
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
 * Checks and displays the mobile control if necessary
 */
function checkMobileControl() {
    let touch = document.getElementById("mobileControls");
    if (window.innerWidth < 720 && touch) {
        touch.classList.remove('d-none');
    }
}

/**
 * Removes the winning screen
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
 * Stops all active intervals
 */
function removeOldTouchBtns() {
    let oldControls = document.getElementById('mobileControls');
    if (oldControls) {
        oldControls.remove();
    }
}

/**
 * Stops all active intervals
 */
function clearAllInterval() {
    for (let i = 1; i < 99999; i++) {
        clearInterval(i);
    }
}

/**
 * Stop the background music
 */
function stopMusic() {
    if (world && world.backgroundMusic) {
        world.backgroundMusic.pause();
        world.backgroundMusic.currentTime = 1;
    }
}

/**
 * Displays the main menu
 */
function backToMainMenu() {
    document.getElementById('startScreen').classList.remove('d-none')
    document.getElementById('buttonContainer').classList.add('d-none')
    document.getElementById('winningScreen').classList.add('d-none')
}

/**
 * Shows or hides the key assignment
 */
function keyAssignment() {
    document.getElementById('keyAssignment').classList.toggle('d-none')
}

// Mute button event after a short delay
setTimeout(() => {
    document.getElementById('muteButton').addEventListener('click', () => {
        if (world) {
            world.toggleMute();
        }
    });
}, 100)

/**
 * Switches between full screen mode and normal mode
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
 * Activates full screen mode for an element
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
 * Exits full screen mode
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}

/**
 * Adds special fullscreen styles to the canvas and overlay
 */
function fullscreenStyle() {
    let canvas = document.getElementById('canvas')
    let overlay = document.getElementById('overlay')
    canvas.classList.add('fullscreen-container-big')
    overlay.classList.add('fullscreen-container-big')
}

/**
 * Removes fullscreen styles from Canvas and Overlay
 */
function closeFullscreen() {
    let canvas = document.getElementById('canvas')
    let overlay = document.getElementById('overlay')
    canvas.classList.remove('fullscreen-container-big')
    overlay.classList.remove('fullscreen-container-big')
}
