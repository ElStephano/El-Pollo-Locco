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

window.onload = () => {keySettings()}
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
    if(!btnContainer.classList.contains('d-none')) {
        btnContainer.classList.add('d-none')
    }
    setTimeout(()=>{
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