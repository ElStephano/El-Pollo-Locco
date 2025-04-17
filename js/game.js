let canvas;
let world;
keyboard = new Keyboard()



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
document.getElementById('controller').addEventListener('click', keyAssignment)


function startGame() {
    stopMusic()
    clearAllInterval()
    initLevel()
    init()
    document.getElementById('startScreen').classList.add('d-none')
}


function restartGame() {
    clearAllInterval()
    level1 = null
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // keySettings()
    let btnContainer = document.getElementById('buttonContainer')
    let winningScreen = document.getElementById('winningScreen')
    if (!btnContainer.classList.contains('d-none')) {
        btnContainer.classList.add('d-none')
        if (!winningScreen.classList.contains('d-none')) {
            winningScreen.classList.add('d-none')
        }
    }
    stopMusic()
    setTimeout(() => {
        // World.isMuted = true
        world = null
        initLevel()
        world = new World(canvas, keyboard);
        world.updateMuteIcon()
        world.restartMusic()
    }, 100)
}


function clearAllInterval() {
    for (let i = 1; i < 99999; i++) {
        clearInterval(i);
    }
}


function stopMusic() {
    if (world && world.backgroundMusic) {
        world.backgroundMusic.pause();           // hier
        world.backgroundMusic.currentTime = 1;
    }
}


function backToMainMenu() {
    document.getElementById('startScreen').classList.remove('d-none')
    document.getElementById('buttonContainer').classList.add('d-none')
    document.getElementById('winningScreen').classList.add('d-none')
}


function keyAssignment() {
    document.getElementById('keyAssignment').classList.toggle('d-none')
}


setTimeout(() => {
    document.getElementById('muteButton').addEventListener('click', () => {
        if (world) {
            world.toggleMute();
        }
    });
}, 100)