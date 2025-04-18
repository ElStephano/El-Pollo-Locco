let canvas;
let world;
keyboard = new Keyboard()
let mobileControls;



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileControls = new MobileControls(keyboard);
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


function checkOrientation() {
    const warning = document.getElementById('orientation-warning');
    if (window.innerHeight > window.innerWidth) {
        // Hochformat
        warning.classList.remove('d-none');
    } else {
        // Querformat
        warning.classList.add('d-none');
    }
}


function startGame() {
    removeOldTouchBtns()
    stopMusic()
    clearAllInterval()
    initLevel()
    init()

    let touch = document.getElementById("mobileControls")
    if(window.innerWidth < 720){
        touch.classList.remove('d-none')
    }
    document.getElementById('startScreen').classList.add('d-none')
}


function restartGame() {
    clearAllInterval()
    level1 = null
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let btnContainer = document.getElementById('buttonContainer');
    let winningScreen = document.getElementById('winningScreen');
    if (!btnContainer.classList.contains('d-none')) {
        btnContainer.classList.add('d-none');
        if (!winningScreen.classList.contains('d-none')) {
            winningScreen.classList.add('d-none');
        }
    }

    let touch = document.getElementById("mobileControls");
    if (window.innerWidth < 720 && touch) {
        touch.classList.remove('d-none');
    }

    // ✨ Remove old touch buttons
    removeOldTouchBtns()

    stopMusic();

    setTimeout(() => {
        world = null;
        mobileControls = null;

        keyboard = new Keyboard(); // ✨ new keyboard!
        initLevel();
        world = new World(canvas, keyboard);
        mobileControls = new MobileControls(keyboard);
        world.updateMuteIcon();
        world.restartMusic();
    }, 100);
}


function removeOldTouchBtns() {
    let oldControls = document.getElementById('mobileControls');
    if (oldControls) {
        oldControls.remove();
    }
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


function toggleFullscreen() {
    let fullscreenContainer = document.getElementById('fullscreenContainer');
    
    if (
        document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.msFullscreenElement
    ) {
        exitFullscreen();
        closeFullscreen()
    } else {
        enterFullscreen(fullscreenContainer);
        fullscreenStyle()
    }
}


function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }


  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  function fullscreenStyle() {
    let canvas = document.getElementById('canvas')
    let overlay = document.getElementById('overlay')
    canvas.classList.add('fullscreen-container-big')
    overlay.classList.add('fullscreen-container-big')
  }

  
  function closeFullscreen() {
    let canvas = document.getElementById('canvas')
    let overlay = document.getElementById('overlay')
    canvas.classList.remove('fullscreen-container-big')
    overlay.classList.remove('fullscreen-container-big')
    
  }